import React from "react";
import { Link, useMatch, useResolvedPath, Routes, Route } from "react-router-dom";

import UpdateUser from "./UpdateUser";
import UpdateMusician from "./UpdateMusician";
import UpdateBand from "./UpdateBand";
import UpdateVenueEvent from "./UpdateVenueEvent";
import UpdatePassword from "./UpdatePassword";
import Messages from "./Messages";
import "./Profile.css";

function Profile() {
  // Como useRouteMatch no existe en v6, vamos a construir url y path de otra forma:
  const resolved = useResolvedPath(""); // ruta base actual
  const url = resolved.pathname; // para los enlaces
  // Para el path en las rutas internas simplemente no es necesario usar un "path" dinámico si defines rutas relativas

  return (
    <div className="profile-buttons">
      <div className="buttons-wrapper">
        <Link to="user-profile">
          <button type="button">USUARIO</button>
        </Link>
        <Link to="musician-profile">
          <button type="button">MÚSICO</button>
        </Link>
        <Link to="band-profile">
          <button type="button">BANDA</button>
        </Link>
        <Link to="venue-event-profile">
          <button type="button">LOCAL-EVENTO</button>
        </Link>
        <Link to="messages">
          <button type="button">MENSAJES</button>
        </Link>
        <Link to="change-password">
          <button type="button">CAMBIAR CONTRASEÑA</button>
        </Link>
      </div>

      <Routes>
        <Route path="user-profile" element={<UpdateUser />} />
        <Route path="musician-profile" element={<UpdateMusician />} />
        <Route path="band-profile" element={<UpdateBand />} />
        <Route path="venue-event-profile" element={<UpdateVenueEvent />} />
        <Route path="messages" element={<Messages />} />
        <Route path="change-password" element={<UpdatePassword />} />
      </Routes>
    </div>
  );
}

export default Profile;