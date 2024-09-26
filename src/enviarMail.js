import ApiKey from "./ApiKey";
import { useRef } from 'react';
import emailjs from '@emailjs/browser';


const SendEmail = (e) => {

    const form = useRef();
    console.log('ESTE ES EL FORM: ' + form)
    e.preventDefault();

    emailjs.sendForm(
        ApiKey.SERVICE_ID,
        ApiKey.TEMPLATE_ID,
        form.current,
        ApiKey.USER_ID
    ).then(
        (result) => {
            alert("Correo enviado correctamente.");
        },
        (error) => {
            alert(`Ocurrio un error, intente nuevamente - ${error}.`);
        }
    );
};

export default SendEmail
