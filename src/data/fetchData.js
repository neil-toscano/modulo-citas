async function sectionDocument(token) {
  const url = `${import.meta.env.VITE_PUBLIC_URL}/section-type-document`;
  const document = await fetch(url, {
    method: "GET",
    headers: {
      "ngrok-skip-browser-warning": "true",
      "Content-Type": "application/json",
      Authorization: `Bearer ${JSON.parse(token)}`,
    },
  });
  const resDocument = document.json();

  return resDocument;
}

async function sectionDocument2(token) {
  const url = `${import.meta.env.VITE_PUBLIC_URL}/section-type-document`;
  const document = await fetch(url, {
    method: "GET",
    headers: {
      "ngrok-skip-browser-warning": "true",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const resDocument = document.json();

  return resDocument;
}
async function postFileAsynId(fileUrl, typeId, token, idFileDocument) {
  const jsonBody = {
    sectionId: typeId,
    typeDocumentId: idFileDocument,
    // sectionTypeId: typeId,
    fileUrl: fileUrl.fileUrl,
    status: "EN PROCESO",
    details: "esta todo bien",
  };
  const url = `${import.meta.env.VITE_PUBLIC_URL}/documents`;
  const document = await fetch(url, {
    method: "POST",
    headers: {
      "ngrok-skip-browser-warning": "true",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(jsonBody),
  });
  const res = await document.json();

  return res;
}

async function updateDocumentFile(fileUrl, token, idFileDocument) {
  const jsonBody = {
    fileUrl: fileUrl.fileUrl,
    status: "EN PROCESO",
    details: "",
  };

  const url = `${import.meta.env.VITE_PUBLIC_URL}/documents/${idFileDocument}`;
  const document = await fetch(url, {
    method: "PATCH",
    headers: {
      "ngrok-skip-browser-warning": "true",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(jsonBody),
  });
  const res = await document.json();

  return res;
}

async function postFileOne(token, file, typeId, type, idFileInput) {
  const formData = new FormData();
  formData.append("file", file);

  const url = `${import.meta.env.VITE_PUBLIC_URL}/files/pdf`;
  const document = await fetch(url, {
    method: "POST",
    headers: {
      "ngrok-skip-browser-warning": "true",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const res = await document.json();

  if (type == "seguimiento") {
    return res;
  }
  if (type === "update") {
    const updateFile = await updateDocumentFile(res, token, idFileInput);
    return updateFile;
  }
  const resAsync = await postFileAsynId(res, typeId, token, idFileInput);

  return resAsync;
}

async function getFilesUser(id, token) {
  // const url = `${import.meta.env.VITE_PUBLIC_URL}/documents/${id}`;
  const url = `${import.meta.env.VITE_PUBLIC_URL}/documents/section/${id}`;
  const document = await fetch(url, {
    headers: {
      "ngrok-skip-browser-warning": "true",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const res = await document.json();
  return res;
}

// antiguo actualizar ya no se usara
async function updateFile(token, file, id, newStatus = false) {
  const type = "seguimiento";

  const newFile = await postFileOne(token, file, id, type);

  const onefile = { fileUrl: newFile.fileUrl };
  const fileStatus = { fileUrl: newFile.fileUrl, status: "EN PROCESO" };
  const jsonBody = newStatus ? fileStatus : onefile;

  const url = `${import.meta.env.VITE_PUBLIC_URL}/documents/${id}`;
  const document = await fetch(url, {
    method: "PATCH",
    headers: {
      "ngrok-skip-browser-warning": "true",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(jsonBody),
  });
  const res = await document.json();
  return res;
}

async function updateStatus(token, status, id, details = null, admi = false) {
  const jsonBody = details ? { details: details } : { status: status };

  const url = admi
    ? `${import.meta.env.VITE_PUBLIC_URL}/documents/admin/${id}`
    : `${import.meta.env.VITE_PUBLIC_URL}/documents/${id}`;
  console.log(url, "viendo body");
  const document = await fetch(url, {
    method: "PATCH",
    headers: {
      "ngrok-skip-browser-warning": "true",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(jsonBody),
  });
  const res = await document.json();
  return res;
}

async function getAllUser(token) {
  const url = `${import.meta.env.VITE_PUBLIC_URL}/user`;

  try {
    const document = await fetch(url, {
      headers: {
        "ngrok-skip-browser-warning": "true",
        "Content-Type": "application/json",
        Authorization: `Bearer ${JSON.parse(token)}`,
      },
    });

    if (!document.ok) {
      throw new Error(`HTTP error! status: ${document.status}`);
    }

    const res = await document.json();
    return res;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error; // Opcional: para manejar el error más arriba en la cadena
  }
}

async function getIdUserDocument(token, id) {
  const url = `${
    import.meta.env.VITE_PUBLIC_URL
  }/documents/super-user/sections/${id}`;
  const document = await fetch(url, {
    headers: {
      "ngrok-skip-browser-warning": "true",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const res = await document.json();

  return res;
}

async function getValidCita(token, id) {
  const url = `${
    import.meta.env.VITE_PUBLIC_URL
  }/process-status/is-eligible-for-appointment/${id}`;
  const document = await fetch(url, {
    headers: {
      "ngrok-skip-browser-warning": "true",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const res = await document.json();
  return res;
}

async function getTimeCita(token) {
  const url = `${import.meta.env.VITE_PUBLIC_URL}/schedule`;
  const document = await fetch(url, {
    headers: {
      "ngrok-skip-browser-warning": "true",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const res = await document.json();
  return res;
}

async function postCita(token, id, idSection) {
  const url = `${
    import.meta.env.VITE_PUBLIC_URL
  }/schedule/reserve/${id}/${idSection}`;
  const document = await fetch(url, {
    method: "POST",
    headers: {
      // "ngrok-skip-browser-warning": "true","Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const res = await document.json();

  return res;
}

async function verifyCita(token, id) {
  const url = `${import.meta.env.VITE_PUBLIC_URL}/appointment/verify/${id}`;
  const verify = await fetch(url, {
    headers: {
      "ngrok-skip-browser-warning": "true",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const res = await verify.json();
  return res;
}

async function getSuperUser(token, idSection) {
  const url = `${
    import.meta.env.VITE_PUBLIC_URL
  }/user-permissions/platform-operators/${idSection}`;
  const verify = await fetch(url, {
    headers: {
      "ngrok-skip-browser-warning": "true",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const res = await verify.json();
  return res;
}

async function getSuperTime(token, id, time) {
  const url = `${
    import.meta.env.VITE_PUBLIC_URL
  }/appointment/week/${id}?date=${time} `;
  const resTime = await fetch(url, {
    headers: {
      "ngrok-skip-browser-warning": "true",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const res = await resTime.json();
  return res;
}

async function getCreateCita(
  token,
  idSection,
  scheduleId,
  userId,
  dataTime,
  reprograme = true
) {
  const fecha = reprograme
    ? { appointmentDate: dataTime, isFirstTime: true }
    : { appointmentDate: dataTime, isFirstTime: false };
  const url = `${
    import.meta.env.VITE_PUBLIC_URL
  }/appointment/${idSection}/${scheduleId}/${userId} `;
  const resTime = await fetch(url, {
    method: "POST",
    headers: {
      "ngrok-skip-browser-warning": "true",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(fecha),
  });

  const res = await resTime.json();
  return res;
}

async function getUserOneCard(token, idSection) {
  const url = `${
    import.meta.env.VITE_PUBLIC_URL
  }/process-status/next-review/${idSection} `;
  const resUser = await fetch(url, {
    headers: {
      "ngrok-skip-browser-warning": "true",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const res = await resUser.json();
  return res;
}

async function getUserDocumentSection(token, idSection, userId) {
  const url = `${
    import.meta.env.VITE_PUBLIC_URL
  }/admin/section/documents/${idSection}/${userId} `;
  const resUser = await fetch(url, {
    headers: {
      "ngrok-skip-browser-warning": "true",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const res = await resUser.json();
  return res;
}

async function getAllCitaReserv(token) {
  const url = `${import.meta.env.VITE_PUBLIC_URL}/appointment`;
  const resUser = await fetch(url, {
    headers: {
      "ngrok-skip-browser-warning": "true",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const res = await resUser.json();
  return res;
}

async function sendEmailUser(token, email) {
  const url = `${import.meta.env.VITE_PUBLIC_URL}/email/send?email=${email}`;
  const resUser = await fetch(url, {
    method: "POST",
    headers: {
      "ngrok-skip-browser-warning": "true",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const res = await resUser.json();
  return res;
}

async function getPedingOne(token, idSection) {
  const url = `${
    import.meta.env.VITE_PUBLIC_URL
  }/process-status/next-corrected/${idSection}`;
  const resUser = await fetch(url, {
    headers: {
      "ngrok-skip-browser-warning": "true",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const res = await resUser.json();
  return res;
}

async function deleteCita(token, idSection, idUser) {
  const url = `${
    import.meta.env.VITE_PUBLIC_URL
  }/appointment/section/${idSection}/${idUser}`;
  const resUser = await fetch(url, {
    method: "DELETE",
    headers: {
      "ngrok-skip-browser-warning": "true",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const res = await resUser.json();
  return res;
}

async function deleteHisoryUser(token, idSection, userId) {
  const url = `${
    import.meta.env.VITE_PUBLIC_URL
  }/admin/finalize/${userId}/${idSection}`;
  const resUser = await fetch(url, {
    method: "DELETE",
    headers: {
      "ngrok-skip-browser-warning": "true",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const res = await resUser.json();
  return res;
}

async function postTokenVerifyEmail(token) {
  const url = `${
    import.meta.env.VITE_PUBLIC_URL
  }/auth/verify-email?token=${token}`;
  const resUser = await fetch(url, {
    method: "POST",
    headers: {
      "ngrok-skip-browser-warning": "true",
      "Content-Type": "application/json",
    },
  });

  const res = await resUser.json();
  return res;
}

// async function RecupePasswordEmail(email) {
//   const url = `${import.meta.env.VITE_PUBLIC_URL}/auth/reset-password?email=${email}`;
//   const resUser = await fetch(url, {
//     method: "POST",
//     headers: {
//       "ngrok-skip-browser-warning": "true","Content-Type": "application/json",
//     },
//   });

//   const res = await resUser.json();
//   return res;
// }

// async function newPassword(token, password) {
//   const jsonNewPassword = { password: password };
//   const url = `${import.meta.env.VITE_PUBLIC_URL}/auth/set-password?token=${token}`;
//   const resUser = await fetch(url, {
//     method: "POST",
//     headers: {
//       "ngrok-skip-browser-warning": "true","Content-Type": "application/json",
//     },
//     body: JSON.stringify(jsonNewPassword),
//   });

//   const res = await resUser.json();
//   return res;
// }

async function getAllPedingCita(token) {
  const url = `${
    import.meta.env.VITE_PUBLIC_URL
  }/documents/all-valid/without-appointment`;
  const resUser = await fetch(url, {
    headers: {
      "ngrok-skip-browser-warning": "true",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const res = await resUser.json();
  return res;
}

async function getProcessFile(token, id) {
  const url = `${import.meta.env.VITE_PUBLIC_URL}/process-status/${id}`;
  const resProcess = await fetch(url, {
    headers: {
      "ngrok-skip-browser-warning": "true",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const res = await resProcess.json();
  return res;
}

async function getCompletFilesInputs(token, id) {
  const url = `${import.meta.env.VITE_PUBLIC_URL}/documents/section/${id}`;
  const resProcess = await fetch(url, {
    headers: {
      "ngrok-skip-browser-warning": "true",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const res = await resProcess.json();
  return res;
}

async function CreateAsingSection(token, sectionId, idUser) {
  const bodyJson = {
    userId: idUser,
    sectionId: sectionId,
  };
  const url = `${import.meta.env.VITE_PUBLIC_URL}/user-permissions`;
  const resProcess = await fetch(url, {
    method: "POST",
    headers: {
      "ngrok-skip-browser-warning": "true",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(bodyJson),
  });

  const res = await resProcess.json();
  return res;
}

async function getValueAccess(token, userId) {
  const url = `${import.meta.env.VITE_PUBLIC_URL}/user-permissions/${userId}`;
  const resProcess = await fetch(url, {
    headers: {
      "ngrok-skip-browser-warning": "true",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const res = await resProcess.json();
  return res;
}

async function deleteValueAccess(token, id) {
  const url = `${import.meta.env.VITE_PUBLIC_URL}/user-permissions/${id}`;
  const resProcess = await fetch(url, {
    method: "DELETE",
    headers: {
      "ngrok-skip-browser-warning": "true",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const res = await resProcess.json();
  return res;
}

async function updateMessageCite(token, idCita, message) {
  const bodyJson = {
    message: message,
  };
  const url = `${import.meta.env.VITE_PUBLIC_URL}/appointment/${idCita}`;
  const resProcess = await fetch(url, {
    method: "PATCH",
    headers: {
      "ngrok-skip-browser-warning": "true",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(bodyJson),
  });

  const res = await resProcess.json();
  return res;
}

async function sendObserDocument(token, email) {
  const url = `${
    import.meta.env.VITE_PUBLIC_URL
  }/email/state-change?email=${email}`;
  const resProcess = await fetch(url, {
    method: "POST",
    headers: {
      "ngrok-skip-browser-warning": "true",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const res = await resProcess.json();
  return res;
}

async function sendVeryDocument(token, email) {
  const url = `${
    import.meta.env.VITE_PUBLIC_URL
  }/email/verified-documents?email=${email}`;
  const resProcess = await fetch(url, {
    method: "POST",
    headers: {
      "ngrok-skip-browser-warning": "true",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const res = await resProcess.json();
  return res;
}

async function startTramiteDocument(token, idProcess, status = false) {
  let bodyJson;
  if (!status) {
    bodyJson = {
      status: "EN_PROCESO",
    };
  } else if (status) {
    bodyJson = {
      status: "CORREGIDO",
    };
  }

  const url = `${import.meta.env.VITE_PUBLIC_URL}/process-status/${idProcess}`;
  const resProcess = await fetch(url, {
    method: "PATCH",
    headers: {
      "ngrok-skip-browser-warning": "true",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(bodyJson),
  });

  const res = await resProcess.json();

  return res;
}

// todo login para el usuario
const urlPagoOnline = import.meta.env.VITE_PUBLIC_URL_PAGO_ONLLINE;

async function tokenAccesPagoOnline() {
  const url = `${urlPagoOnline}/login-acceso?email=${
    import.meta.env.VITE_PUBLIC_EMAIL_ONLINE
  }&password=${import.meta.env.VITE_PUBLIC_PASSWORD_ONLINE}${
    import.meta.env.VITE_PUBLIC_NUMBER
  }sjl`;
  const resToken = await fetch(url, {
    method: "POST",
    headers: {
      "ngrok-skip-browser-warning": "true",
      "Content-Type": "application/json",
    },
  });

  const res = await resToken.json();

  return res.access_token;
}

async function LoginPagoOnline(data) {
  const tokenOnline = await tokenAccesPagoOnline();

  const url = `${urlPagoOnline}/inicio-sesion?codigo=${data.dni}&password=${data.password}`;
  const resLogin = await fetch(url, {
    method: "POST",
    headers: {
      "ngrok-skip-browser-warning": "true",
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokenOnline}`,
    },
  });

  const res = await resLogin.json();
  return res;
}

async function LoginFormPost(data) {
  // todo: solo usalo en el trabajo
  const resPagoOnline = await LoginPagoOnline(data);

  if (!resPagoOnline.success) {
    return {
      error: true,
      message: resPagoOnline?.message || resPagoOnline?.errors.codigo,
    };
  }
  const bodyForm = {
    documentNumber: resPagoOnline.usuario.numero_documento,
    firstName: resPagoOnline.usuario.nombres,
    apellido_paterno: resPagoOnline.usuario.apellido_paterno,
    apellido_materno: resPagoOnline.usuario.apellido_materno,
    email: resPagoOnline.usuario.email,
  };


  const url = `${import.meta.env.VITE_PUBLIC_URL}/auth/login`;
  const resProcess = await fetch(url, {
    method: "POST",
    headers: {
      "ngrok-skip-browser-warning": "true",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bodyForm),
  });

  const res = await resProcess.json();

  return res;
}

async function CreateUserPagoOnline(data) {
  const tokenOnline = await tokenAccesPagoOnline();
  const queryString =
    `numero_documento=${data.dni}&correo=${data.email}&nombres=${data.firstName}` +
    `&apellido_paterno=${data.apellido_paterno}&contrasena=${data.password}` +
    `&tipo_documento_identidad=${2}` +
    `&razon_social=${""}&apellido_materno=${data.apellido_materno}`;

  const url = `${urlPagoOnline}/registrar?${queryString}`;
  const resProcess = await fetch(url, {
    method: "POST",
    headers: {
      "ngrok-skip-browser-warning": "true",
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokenOnline}`,
    },
  });

  const res = await resProcess.json();
  return res;
}

async function CreateUserLogin(data) {
  const resPagoOnline = await CreateUserPagoOnline(data);
  if (!resPagoOnline.success) {
    if (resPagoOnline?.errors.numero_documento) {
      return {
        error: true,
        message: resPagoOnline.errors.numero_documento,
      };
    } else if (resPagoOnline?.errors.correo) {
      return {
        error: true,
        message: resPagoOnline.errors.correo,
      };
    }
  }
  const bodyForm = {
    documentNumber: resPagoOnline.usuario.numero_documento,
    firstName: resPagoOnline.usuario.nombres,
    apellido_paterno: resPagoOnline.usuario.apellido_paterno,
    apellido_materno: resPagoOnline.usuario.apellido_materno,
    email: resPagoOnline.usuario.email,
    address: data.address,
    mobileNumber: data.mobileNumber,
    district: data.district,
  };

  const url = `${import.meta.env.VITE_PUBLIC_URL}/auth/register`;
  const resProcess = await fetch(url, {
    method: "POST",
    headers: {
      "ngrok-skip-browser-warning": "true",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bodyForm),
  });

  const res = await resProcess.json();
  return res;
}

async function UpdateUserLogin(data) {
  const idUser = { ...data };
  delete data.idUser;
  const url = `${import.meta.env.VITE_PUBLIC_URL}/user/${idUser.idUser}`;
  const resProcess = await fetch(url, {
    method: "PATCH",
    headers: {
      "ngrok-skip-browser-warning": "true",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const res = await resProcess.json();
  return res;
}

async function ResetPassword(dni) {
  const tokenOnline = await tokenAccesPagoOnline();
  const url = `${urlPagoOnline}/recuperar-credenciales?numero_documento=${dni}`;
  const resProcess = await fetch(url, {
    method: "POST",
    headers: {
      "ngrok-skip-browser-warning": "true",
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokenOnline}`,
    },
  });

  const res = await resProcess.json();
  return res;
}

//getCompletFilesInputs
const dataApi = {
  sectionDocument2,
  ResetPassword,
  updateDocumentFile,
  startTramiteDocument,
  sendVeryDocument,
  sendObserDocument,
  UpdateUserLogin,
  CreateUserLogin,
  LoginFormPost,
  updateMessageCite,
  deleteValueAccess,
  getValueAccess,
  CreateAsingSection,
  getCompletFilesInputs,
  getProcessFile,
  getAllPedingCita,
  postTokenVerifyEmail,
  deleteHisoryUser,
  deleteCita,
  getPedingOne,
  sendEmailUser,
  getAllCitaReserv,
  getUserDocumentSection,
  getUserOneCard,
  getCreateCita,
  getSuperTime,
  getSuperUser,
  verifyCita,
  postCita,
  getTimeCita,
  getValidCita,
  updateStatus,
  getIdUserDocument,
  getAllUser,
  getFilesUser,
  sectionDocument,
  postFileOne,
  updateFile,
};

export default dataApi;
