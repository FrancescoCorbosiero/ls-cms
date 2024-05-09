const jsonMessagesItalian = {
    //FORM TEXT
    pendingFormText: "La tua richiesta di registrazione è andata a buon fine, a breve verrà approvata",
    registrationFormText: "Inserisci i dati dell'azienda",
    recipientFormText: "Inserisci i dati del destinatario",
    orderFormText: "Inserisci i dati dell'ordine",
    emailFormText: "Inserisci email",
    confirmDataFormText: "Per confermare i dati inseriti clicca nuovamente il pulsante 'Avanti' ",
    registrationEmailSentFormText: "Ci siamo quasi, per completare la registrazione segui le istruzioni contenute nella mail che ti abbiamo mandato",
    orderEmailSentFormText: "Il tuo ordine è stato inoltrato presso il nostro centro logistico. Verrai notificato dell'avvenuta presa in carico dell'ordine. Grazie per aver scelto Sanchez Logistica!",

    //Units
    weightUnit: "kg",
    lenghtUnit: "cm",
    volumeUnit: "m3",

    //Overall
    overall: "Totale",

    //USER DATA PLACEHOLDER
        //Login
        username: "username",
        password: "password",

        //Order
        orderCode: "Codice Ordine",

    //DIALOG
        dialogConfirm: "Conferma",
        dialogCancel: "Annulla",
        dialogClose: "Chiudi",

        //ERROR
        errorDialogTitle: "Errore",

        //LOGIN
        loginDialogTitle: "Login",
        
        errorDialogText: 
        `Ops, si è verificato un errore riprova più tardi. 
        Se il problema persiste contattaci via email o telefonicamente`,

        //Pallet
        palletDialogDataTitle: "Pallet",

    //DATA TABLE
        //Customer
        pendingCustomersEmpty: "Nessun utente da approvare",
        registredCustomersEmpty: "Nessun utente registrato",

        //Order
        pendingOrdersEmpty: "Nessun ordine da approvare",
        tracedOrdersEmpty: "Nessun ordine da approvare",

    //PALLET TYPE
        genericPallet: "Pallet Generico",
        epal: "Epal",

    //BUTTON
        //Data table
        approve: "Approva",
        decline: "Rimuovi",

        search: "Ricerca",

        //Tab bar
            //Customer
            pendingCustomers: "In Approvazione",
            registredCustomers: "Registrati",
            //Orders
            pendingOrders: "In Approvazione",
            searchOrder: "Ricerca",

        trackingStateOpenDropdownText: "Seleziona stato",

        //Navigation
        nextButtonText: "Avanti",
        previousButtonText: "Indietro",
        //Service
        serviceOpenDropdownText: "Seleziona servizio accessorio",
        //Pallet
        palletOpenDialogButtonText: "Aggiungi Pallet",
        palletOpenDropdownTypeText: "Tipo Pallet"
}

export let language = jsonMessagesItalian;

const languageMap = new Map([ ['italian', jsonMessagesItalian] ]);

export function getLanguageMessages(selectedLanguage){
    language = languageMap.get(selectedLanguage);
}