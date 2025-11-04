import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCTF-kb3OxYv1VJ1qKYbDSaXlV-0czhHGI",
  authDomain: "barbero-express-a4db5.firebaseapp.com",
  projectId: "barbero-express-a4db5",
  storageBucket: "barbero-express-a4db5.firebasestorage.app",
  messagingSenderId: "754219692587",
  appId: "1:754219692587:web:bce555736ccf9b883bb06e",
  measurementId: "G-SV2N5J71GY"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function cargarPrecios() {
  const ref = doc(db, "precios", "servicios");
  const snap = await getDoc(ref);

  if (snap.exists()) {
    const datos = snap.data();
    document.getElementById("precioCorteExpress").textContent = "$" + datos.corte_express;
    document.getElementById("precioAfeitadoClasico").textContent = "$" + datos.afeitado_clasico;
    document.getElementById("precioBarbaPerfecta").textContent = "$" + datos.barba_perfecta;
    document.getElementById("precioComboCompleto").textContent = "$" + datos.Combo_completo;
  } else {
    console.log("No hay datos de precios");
  }
}
cargarPrecios();

import { getFirestore, doc, getDoc } from "firebase/firestore";