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
        emailCliente: "Email Cliente",

    //DIALOG
        dialogConfirm: "Conferma",
        dialogSet: "Imposta",
        dialogCancel: "Annulla",
        dialogClose: "Chiudi",
        dialogModify: "Modifica",

        //ERROR
        errorDialogTitle: "Errore",

        //LOGIN
        loginDialogTitle: "Login",
        confirmationDialogTitle: "Sei sicuro di voler procedere?",
        approveOrderDialogTitle: "Approva ordine",
        traceOrderDialogTitle: "Imposta tracking",
        updateNotesDialogTitle: "Aggiorna note",

        errorDialogText: 
        `Ops, si è verificato un errore riprova più tardi. 
        Se il problema persiste contattaci via email o telefonicamente`,

        //Pallet
        confirmationDialogDataTitle: "Vuoi procedere?",
        approveOrderDialogDataTitle: "Approva Ordine",

    //DATA TABLE
        //Customer
        pendingCustomersEmpty: "Nessun utente da approvare",
        registredCustomersEmpty: "Nessun utente registrato",

        //Order
        pendingOrdersEmpty: "Nessun ordine da approvare",
        registredOrdersEmpty: "Nessun ordine registrato",
        tracedOrdersEmpty: "Nessun ordine da approvare",

    //PALLET TYPE
        genericPallet: "Pallet Generico",
        epal: "Epal",

    //BUTTON
        //Data table
        approve: "Approva",
        decline: "Rimuovi",
        sendReport: "Invia Report",

        search: "Imposta stato",

        //Tab bar
            //Customer
            pendingCustomers: "In Approvazione",
            registredCustomers: "Registrati",
            //Orders
            pendingOrders: "In Approvazione",
            registredOrders: "Registrati",
            //Tracking
            searchOrder: "Tracking",
            //Report
            report: "Report",

        trackingStateOpenDropdownText: "Seleziona tracking",

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