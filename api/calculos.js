const express = require("express");
const router = express.Router();

const queriesFacturas = require("../db/queries-facturas");
const queriesBancos = require("../db/queries-bancos");
const queriesTasas = require("../db/queries-tasas");

async function calculoDeDescuentoFactura(facturaId, bancoId, tasaId, fechaDescuento) {
  // Encontrar la factura
  const factura = await queriesFacturas.getOne(facturaId);
  // Encontrar el banco
  const banco = await queriesBancos.getOne(bancoId);
  //Encontrar la tasa
  const tasa = await queriesTasas.getOne(tasaId);

  // Calcular Tasa efectiva del periodo
  // obtener la tasa efectiva del banco y el periodo
  const numero_dias_transladar = 15
  const plazo_tasa = tasa.plazo_tasa
  const valor_tasa = tasa.valor
  const TEP = Math.sqrt(1+valor_tasa,(numero_dias_transladar/plazo_tasa))

  // Calcular la tasa descontada
  const valor_nominal = factura.valor_venta
  const DPorc = TEP / (1+TEP)
  const Descuento = valor_nominal * DPorc 
  const valor_neto = valor_nominal* (1-DPorc)
  const valor_neto2 = valor_nominal - Descuento

  const valorRecibido = 0
  const valorEntregado = 0
  const fechaGiro = Date.now()
  
  return {
    factura,
    banco,
    tasa,
    results: {
      plazo_tasa,
      valor_tasa,
      TEP,
      valor_nominal,
      DPorc,
      Descuento,
      valor_neto,
      valor_neto2,
      valorRecibido,
      valorEntregado,
      fechaGiro,

      //Por calcular
      valor_nominal,
      dias,
      retencion,
      tasa_efectiva,
      porcentaje_descuento,
      descuento,
      costes_iniciales,
      costes_finales,
      valor_neto,
      valor_recibido,
      valor_entregado,
      tcea,
    }
  };
}




router.get("/", (req, res) => {
  const { facturaId, bancoId, tasaId } = req.body;

  calculoDeDescuentoFactura(facturaId, bancoId, tasaId).then(result => {
    return res.json(result);
  });
});

module.exports = router;
