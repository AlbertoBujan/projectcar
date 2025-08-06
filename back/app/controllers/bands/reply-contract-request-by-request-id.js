"use strict";
const Joi = require("joi");
const createJsonError = require("../errors/create-json-errors");
const {
  findVenueEventIdByContractId,
  findVenueEventUserIdByVenueEventId,
} = require("../../repositories/venues-events-repository");
const { findEmailByUser } = require("../../repositories/users-repository");
const {
  findBandIdOfUser,
  findBandIdByContractId,
  insertBandResponseIntoContractTable,
} = require("../../repositories/bands-repository");
const { sendEmailReplyContractRequest } = require("../../helpers/mail-smtp");

const schema = Joi.object().keys({
  idContrato: Joi.number().positive().required(),
  mensaje: Joi.string().min(10).max(500).required(),
  respuestaSolicitud: Joi.string().valid("Aceptada", "Rechazada").required(),
});

async function replyContractRequest(req, res) {
  try {
    const { idContrato, mensaje, respuestaSolicitud } = req.body;
    const { id_usuario } = req.auth;

    const venueEventId = await findVenueEventIdByContractId(idContrato);

    if (!venueEventId) {
      const error = new Error("No existen contratos con este ID ");
      error.status = 400;
      throw error;
    }

    const venueEventUserId = await findVenueEventUserIdByVenueEventId(
      venueEventId.id_local_evento
    );

    const venueEventEmail = await findEmailByUser(venueEventUserId.id_usuario);

    const bandId = await findBandIdOfUser(id_usuario);

    const existBandId = await findBandIdByContractId(idContrato);

    if (existBandId[0].id_banda !== bandId.id_banda) {
      const error = new Error(
        "El contrato indicado no está asociado a esa banda"
      );
      error.status = 400;
      throw error;
    }

    await insertBandResponseIntoContractTable(respuestaSolicitud, idContrato);

    await sendEmailReplyContractRequest(
      venueEventEmail[0].email,
      mensaje,
      respuestaSolicitud
    );

    res.send({ message: "Tu mensaje ha sido enviado" });
  } catch (err) {
    createJsonError(err, res);
  }
}

module.exports = replyContractRequest;
