const express = require("express");
const router = express.Router();

const queries = require("../db/queries-contratos");
const queriesFacturas = require("../db/queries-facturas");
const queriesBancos = require("../db/queries-bancos");
const queriesTasas = require("../db/queries-tasas");

//Casos prueba http://www.e-financebook.com/aplicaciones/e-Book4/Anexos/Cap%2005%20-%20Tasa%20Descontada%20-%20Solucionario%2035.pdf

function calcularDiferenciaFechasEnDias(fecha_inicial, fecha_final) {
  let fechaInicial = new Date(fecha_inicial);
  let fechaFinal = new Date(fecha_final);
  let timeDiff = Math.abs(fechaFinal.getTime() - fechaInicial.getTime());
  let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
  if (diffDays < 0) {
    return new Error("Error al calcular diferencia entre fechas");
  }
  return diffDays;
}

function calcularTEP(valor_tasa, dias, plazo_tasa) {
  let p_valor_tasa = Number(valor_tasa)
  let p_dias = Number(dias)
  let p_plazo_tasa = Number(plazo_tasa)
  let final = Math.pow(1 + p_valor_tasa, p_dias / p_plazo_tasa) - 1
  return final;
}

function TCEA(valor_recibido, valor_entregado, numero_dias_transladar) {
  let p_valor_recibido = Number(valor_recibido)
  let p_valor_entregado = Number(valor_entregado)
  let p_numero_dias_transladar = Number(numero_dias_transladar)
  let tcea =
  Math.pow(p_valor_entregado / p_valor_recibido, 360 / p_numero_dias_transladar) - 1;
  console.log("tcea", tcea);
  return tcea;
}

async function calculoDeDescuentoFactura(
  facturaId,
  bancoId,
  tasaId,
  fechaGiro
) {
  //Valores por calcular
  const fecha_giro = fechaGiro;
  let fecha_vencimiento = null;
  let valor_nominal = null;
  let dias = null;
  const retencion = null;
  let tasa_efectiva = null;
  let porcentaje_descuento = null;
  let descuento = null;
  let costos_iniciales = null;
  let costos_finales = null;
  let valor_neto = null;
  let valor_recibido = null;
  let valor_entregado = null;
  let tcea = null;

  // Encontrar la factura
  const FacturaModel = await queriesFacturas.getOne(facturaId);
  // Encontrar el banco
  const BancoModel = await queriesBancos.getOne(bancoId);
  //Encontrar la tasa
  const TasaModel = await queriesTasas.getOne(tasaId);

  // Calcular Tasa efectiva del periodo
  // obtener la tasa efectiva del banco y el periodo
  fecha_vencimiento = FacturaModel.fecha_vencimiento;
  dias = calcularDiferenciaFechasEnDias(fecha_vencimiento, fecha_giro);
  const plazo_tasa = TasaModel.plazo_tasa;
  const valor_tasa = TasaModel.valor;
  tasa_efectiva = calcularTEP(valor_tasa, dias, plazo_tasa);

  // Calcular la tasa descontada
  valor_nominal = Number(FacturaModel.valor_venta);
  porcentaje_descuento = tasa_efectiva / (1 + tasa_efectiva);
  descuento = valor_nominal * porcentaje_descuento;
  valor_neto = valor_nominal * (1 - porcentaje_descuento);

  costos_iniciales = Number(BancoModel.costos_iniciales);
  costos_finales = Number(BancoModel.costos_finales);

  // valor_recibido = valor_neto - costes_iniciales - retencion;
  // valor_entregado = valor_nominal + costes_finales - retencion;
  valor_recibido = valor_neto -  costos_iniciales 
  valor_entregado = valor_nominal + costos_finales 

  tcea = TCEA(valor_recibido, valor_entregado, dias);

  let resultados = {
    fecha_giro,
    fecha_vencimiento,
    valor_nominal,
    dias,
    retencion,
    tasa_efectiva,
    porcentaje_descuento,
    descuento,
    costos_iniciales,
    costos_finales,
    valor_neto,
    valor_recibido,
    valor_entregado,
    tcea
  }

  const contrato = await queries.create({
    banco_id: bancoId,
    factura_id: facturaId,
    ...resultados
  });

  return {
    FacturaModel,
    BancoModel,
    TasaModel,
    contrato
  };
}

function validId(req, res, next) {
  if (!isNaN(req.params.id)) return next();
  next(new Error("Invalid ID"));
}
router.get("/", (req, res) => {
  queries.getAll().then(result => {
    return res.json(result);
  });
});

router.get("/:id", validId, (req, res, next) => {
  queries.getOne(req.params.id).then(object => {
    if (object) {
      return res.json(object);
    } else {
      next();
    }
  });
});

router.post("/", (req, res, next) => {
  const { facturaId, bancoId, tasaId, fechaGiro } = req.body;
  calculoDeDescuentoFactura(facturaId, bancoId, tasaId, fechaGiro).then(
    result => {
      return res.json(result);
    }
  );
});

router.put("/:id", validId, (req, res, next) => {
  queries.update(req.params.id, req.body).then(listUpdated => {
    return res.json(listUpdated[0]);
  });
});

router.delete("/:id", validId, (req, res, next) => {
  queries.delete(req.params.id).then(() => {
    return res.json({
      deleted: true
    });
  });
});

module.exports = router;
