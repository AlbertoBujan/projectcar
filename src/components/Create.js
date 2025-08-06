import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import CreateBand from "./CreateBand";
import CreateMusician from "./CreateMusicians";
import CreateVenueEvent from "./CreateVenueEvent";
import NavBar from "./NavBar";

function Create() {
  return (
    <div>
      <NavBar />
      <div>
        <button type="submit">
          <Link to="create-musician">Crear Músico</Link>
        </button>
        <button type="submit">
          <Link to="create-band">Crear Banda</Link>
        </button>
        <button type="submit">
          <Link to="create-venue-event">Crear Local/Evento</Link>
        </button>
      </div>

      <Routes>
        <Route path="create-musician" element={<CreateMusician />} />
        <Route path="create-band" element={<CreateBand />} />
        <Route path="create-venue-event" element={<CreateVenueEvent />} />
      </Routes>
    </div>
  );
}

export default Create;