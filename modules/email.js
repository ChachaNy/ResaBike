var nodemailer = require('nodemailer');

module.exports= {

    /* -- EMAIL METHODS --*/
    sendEmail(to, subject, text) {
        return new Promise(function (resolve, reject) {
            let transporter = nodemailer.createTransport({
                service: 'gmail', //we choose the service we want to use
                secure: false,
                port: 25,
                auth: {
                    user: 'resabiketesting@gmail.com', //We created a gmail address for resabike and need to specify the login
                    pass: 'Resabike1234' //and the password to be able to send emails to clients
                },
                tls: {
                    rejectUnauthorized: false
                }
            });
            //Here we choose our emails options. The to, subject and text must be defined as they can change but we choose to
            //take a from that is always the same
            let mailOptions = {
                from: '"Resabike" <resabiketesting@gmail.com',
                to: to,
                subject: subject,
                text: text
            };
            //In case of error while sending a mail
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.log(error);
                }
                console.log("The message was sent!");
                console.log(info);
            });
            resolve('ok')
        })

    },

    createTextConfirmer(reservation, personContact){
        return new Promise(function (resolve, reject){
            //Personalized text for the confirmation email when the client has done a reservation (3 languages)
            //Data taken to show the reservation and the person of contact
            var text = "Merci pour votre réservation!\n" +
                " \n"+
                "Un email vous sera envoyé dans les plus brefs délais afin de vous confirmer si votre réservation peut être effective ou si elle ne peut malheureusement pas l'être car le nombre maximum de places est dépassé.\n" +
                "En récapitulatif de votre réservation : \n"+" \n"+
                "Station-départ : "+reservation.from+"\n"+
                "Station-arrivée : "+reservation.to+"\n"+
                "Date : "+reservation.dateReservation.dataValues.day + "." + reservation.dateReservation.dataValues.month + "." + reservation.dateReservation.dataValues.year+"\n"+
                "Heure de départ : "+reservation.reservationJourneyReservation[0].journeyJourneyReservation.dataValues.horaire+"\n"+
                "N° de réservation : "+reservation.id_reservation+"\n"+
                "Prénom : "+reservation.firstName+"\n"+
                "Nom de famille : "+reservation.lastName+"\n"+
                "Nom de groupe : "+reservation.groupName+"\n"+
                "Nombre de vélos : "+reservation.numberBikes+"\n"+" \n"+
                "Si vous souhaitez annuler votre réservation, merci de vous adresser à la personne de contact suivante : \n"+" \n"+
                "Nom : "+personContact.firstName+" "+personContact.lastName+" \n"+
                "Tel : "+personContact.telephon+" \n"+
                "Email : "+personContact.email+" \n"+" \n"+
                "Nous vous remercions de votre compréhension et d'avoir choisi de voyager avec Car Postal.\n"+
                " \n"+
                "Votre équipe ResaBike"+" \n"+
                "______________________________________________________________________________________________________"+" \n"+
                "Thank you for your booking!\n" +
                " \n"+
                "An email will be sent to you as soon as possible to confirm if your reservation can be effective or if it cannot be done because the maximum number of places is exceeded.\n" +
                "In summary of your reservation : \n"+" \n"+
                "Departure-station : "+reservation.from+"\n"+
                "Arrival-station : "+reservation.to+"\n"+
                "Date : "+reservation.dateReservation.dataValues.day + "." + reservation.dateReservation.dataValues.month + "." + reservation.dateReservation.dataValues.year+"\n"+
                "Departure Time : "+reservation.reservationJourneyReservation[0].journeyJourneyReservation.dataValues.horaire.substr(11, 5)+"\n"+
                "N° of reservation : "+reservation.id_reservation+"\n"+
                "First name : "+reservation.firstName+"\n"+
                "Last name : "+reservation.lastName+"\n"+
                "Group name : "+reservation.groupName+"\n"+
                "Number of bikes : "+reservation.numberBikes+"\n"+" \n"+
                "If you wish to cancel your reservation, please contact the following contact person : \n"+" \n"+
                "Name : "+personContact.firstName+" "+personContact.lastName+" \n"+
                "Tel : "+personContact.telephon+" \n"+
                "Email : "+personContact.email+" \n"+" \n"+
                "Thank you for your understanding and for choosing to travel with CarPostal.\n"+
                " \n"+
                "Your ResaBike team"+" \n"+
                "______________________________________________________________________________________________________"+" \n"+
                "Danke für Ihre Reservierung!\n" +
                " \n"+
                "Eine E-Mail wird Ihnen so schnell wie möglich zugesandt, um zu bestätigen, ob Ihre Reservierung wirksam sein kann oder nicht, da die maximale Anzahl an Plätzen überschritten wird.\n" +
                "Zusammenfassung Ihrer Reservierung : \n"+" \n"+
                "Abfahrtsstation : "+reservation.from+"\n"+
                "Ankunftsstation : "+reservation.to+"\n"+
                "Datum : "+reservation.dateReservation.dataValues.day + "." + reservation.dateReservation.dataValues.month + "." + reservation.dateReservation.dataValues.year+"\n"+
                "Abfahrtszeit : "+reservation.reservationJourneyReservation[0].journeyJourneyReservation.dataValues.horaire+"\n"+
                "Reservierungsnummer : "+reservation.id_reservation+"\n"+
                "Vorname : "+reservation.firstName+"\n"+
                "Nachname : "+reservation.lastName+"\n"+
                "Gruppenname : "+reservation.groupName+"\n"+
                "Anzahl der Fahrräder: "+reservation.numberBikes+"\n"+" \n"+
                "Wenn Sie Ihre Reservierung stornieren möchten, wenden Sie sich bitte an die folgende Kontaktperson : \n"+" \n"+
                "Name : "+personContact.firstName+" "+personContact.lastName+" \n"+
                "Tel : "+personContact.telephon+" \n"+
                "Email : "+personContact.email+" \n"+" \n"+
                "Wir danken Ihnen für Ihr Verständnis und für die Entscheidung, mit CarPostal zu reisen.\n"+
                "Ihr ResaBike-Team";

            resolve(text)
        })
    },
    createTextAccepter(reservation, personContact){
        return new Promise(function (resolve, reject){
            //Personalized text for the email that is send when the reservation has been accepted (3 languages)
            //Data taken to show the reservation and the person of contact
            var text = "Cher client/e,\n" +
                " \n"+
                "Nous avons le plaisir de vous annoncer que votre réservation est bien effective et que le nombre de places pour vos vélos a été réservé.\n" +
                "En récapitulatif de votre réservation : \n"+" \n"+
                "Station-départ : "+reservation.from+"\n"+
                "Station-arrivée : "+reservation.to+"\n"+
                "Date : "+reservation.dateReservation.dataValues.day + "." + reservation.dateReservation.dataValues.month + "." + reservation.dateReservation.dataValues.year+"\n"+
                "Heure de départ : "+reservation.reservationJourneyReservation[0].journeyJourneyReservation.dataValues.horaire+"\n"+
                "N° de réservation : "+reservation.id_reservation+"\n"+
                "Prénom : "+reservation.firstName+"\n"+
                "Nom de famille : "+reservation.lastName+"\n"+
                "Nom de groupe : "+reservation.groupName+"\n"+
                "Nombre de vélos : "+reservation.numberBikes+"\n"+" \n"+
                "Si vous souhaitez annuler votre réservation, merci de vous adresser à la personne de contact suivante : \n"+" \n"+
                "Nom : "+personContact.firstName+" "+personContact.lastName+" \n"+
                "Tel : "+personContact.telephon+" \n"+
                "Email : "+personContact.email+" \n"+" \n"+
                "Nous vous remercions d'avoir choisi Resabike et vous souhaitons un agréable voyage.\n"+
                " \n"+
                "Votre team ResaBike"+" \n"+
                "______________________________________________________________________________________________________"+" \n"+
                "Dear client,\n" +
                " \n"+
                "We are pleased to announce that your reservation is effective and that the number of places for your bikes has been blocked.\n" +
                "In summary of your reservation : \n"+" \n"+
                "Departure-station : "+reservation.from+"\n"+
                "Arrival-station : "+reservation.to+"\n"+
                "Date : "+reservation.dateReservation.dataValues.day + "." + reservation.dateReservation.dataValues.month + "." + reservation.dateReservation.dataValues.year+"\n"+
                "Departure Time : "+reservation.reservationJourneyReservation[0].journeyJourneyReservation.dataValues.horaire+"\n"+
                "N° of reservation : "+reservation.id_reservation+"\n"+
                "First name : "+reservation.firstName+"\n"+
                "Last name : "+reservation.lastName+"\n"+
                "Group name : "+reservation.groupName+"\n"+
                "Number of bikes : "+reservation.numberBikes+"\n"+" \n"+
                "If you wish to cancel your reservation, please contact the following contact person : \n"+" \n"+
                "Name : "+personContact.firstName+" "+personContact.lastName+" \n"+
                "Tel : "+personContact.telephon+" \n"+
                "Email : "+personContact.email+" \n"+" \n"+
                "We thank you for choosing Resabike and wish you a pleasant trip. \n"+
                " \n"+
                "Your ResaBike team"+" \n"+
                "______________________________________________________________________________________________________"+" \n"+
                "Lieber Kunde,\n" +
                " \n"+
                "Wir freuen uns, Ihnen mitteilen zu können, dass Ihre Reservierung wirksam ist und dass die Anzahl der Plätze für Ihre Fahrräder gebucht wurde.\n" +
                "Zusammenfassung Ihrer Reservierung : \n"+" \n"+
                "Abfahrtsstation : "+reservation.from+"\n"+
                "Ankunftsstation : "+reservation.to+"\n"+
                "Datum : "+reservation.dateReservation.dataValues.day + "." + reservation.dateReservation.dataValues.month + "." + reservation.dateReservation.dataValues.year+"\n"+
                "Abfahrtszeit : "+reservation.reservationJourneyReservation[0].journeyJourneyReservation.dataValues.horaire+"\n"+
                "Reservierungsnummer : "+reservation.id_reservation+"\n"+
                "Vorname : "+reservation.firstName+"\n"+
                "Nachname : "+reservation.lastName+"\n"+
                "Gruppenname : "+reservation.groupName+"\n"+
                "Anzahl der Fahrräder: "+reservation.numberBikes+"\n"+" \n"+
                "Wenn Sie Ihre Reservierung stornieren möchten, wenden Sie sich bitte an die folgende Kontaktperson : \n"+" \n"+
                "Name : "+personContact.firstName+" "+personContact.lastName+" \n"+
                "Tel : "+personContact.telephon+" \n"+
                "Email : "+personContact.email+" \n"+" \n"+
                "Wir danken Ihnen, dass Sie sich für Resabike entschieden haben und wünschen Ihnen eine angenehme Reise.\n"+
                " \n"+
                "Ihr ResaBike-Team";
            resolve(text)
        })
    },
    createTextRefuser(reservation) {
        return new Promise(function (resolve, reject) {
            //Personalized text for the email that is send when the reservation has been denied (3 languages)
            //Data taken to show the reservation details
            var text = "Cher client/e,\n" +
                " \n" +
                "Nous avons le regret de vous annoncer que votre réservation ne peut malheureusement pas être effective car le nombre de places disponibles n'est pas suffisant pour votre nombre de vélos.\n" +
                "En récapitulatif de votre réservation : \n" + " \n" +
                "Station-départ : " + reservation.from + "\n" +
                "Station-arrivée : " + reservation.to + "\n" +
                "Date : " + reservation.dateReservation.dataValues.day + "." + reservation.dateReservation.dataValues.month + "." + reservation.dateReservation.dataValues.year + "\n" +
                "Heure de départ : " + reservation.reservationJourneyReservation[0].journeyJourneyReservation.dataValues.horaire + "\n" +
                "N° de réservation : " + reservation.id_reservation + "\n" +
                "Prénom : " + reservation.firstName + "\n" +
                "Nom de famille : " + reservation.lastName + "\n" +
                "Nom de groupe : " + reservation.groupName + "\n" +
                "Nombre de vélos : " + reservation.numberBikes + "\n" + " \n" +
                "Cependant, il est possible qu'il reste suffisamment de places à un autre horaire et nous vous encourageons à effectuer une nouvelle réservation.\n" +
                "Nous vous remercions de la confiance accordée et espérons pouvoir répondre à une demande ultérieure de votre part.\n" +
                " \n" +
                "Votre team ResaBike" + " \n" +
                "______________________________________________________________________________________________________" + " \n" +
                "Dear client,\n" +
                " \n" +
                "We regret to announce that your booking can not be effective because the number of places available is not enough for your number of bikes.\n" +
                "In summary of your reservation : \n" + " \n" +
                "Departure-station : " + reservation.from + "\n" +
                "Arrival-station : " + reservation.to + "\n" +
                "Date : " + reservation.dateReservation.dataValues.day + "." + reservation.dateReservation.dataValues.month + "." + reservation.dateReservation.dataValues.year + "\n" +
                "Departure Time : " + reservation.reservationJourneyReservation[0].journeyJourneyReservation.dataValues.horaire + "\n" +
                "N° of reservation : " + reservation.id_reservation + "\n" +
                "First name : " + reservation.firstName + "\n" +
                "Last name : " + reservation.lastName + "\n" +
                "Group name : " + reservation.groupName + "\n" +
                "Number of bikes : " + reservation.numberBikes + "\n" + " \n" +
                "However, it is possible that there are enough seats on another schedule and we encourage you to make a new booking.\n" +
                "We thank you for your trust and hope to respond to a subsequent request from you.\n" +
                " \n" +
                "Your ResaBike team" + " \n" +
                "______________________________________________________________________________________________________" + " \n" +
                "Lieber Kunde,\n" +
                " \n" +
                "Es tut uns leid zu verkünden, dass Ihre Buchung nicht effektiv sein kann, da die Anzahl der verfügbaren Plätze nicht ausreicht für Ihre Anzahl an Fahrrädern.\n" +
                "Zusammenfassung Ihrer Reservierung : \n" + " \n" +
                "Abfahrtsstation : " + reservation.from + "\n" +
                "Ankunftsstation : " + reservation.to + "\n" +
                "Datum : " + reservation.dateReservation.dataValues.day + "." + reservation.dateReservation.dataValues.month + "." + reservation.dateReservation.dataValues.year + "\n" +
                "Abfahrtszeit : " + reservation.reservationJourneyReservation[0].journeyJourneyReservation.dataValues.horaire + "\n" +
                "Reservierungsnummer : " + reservation.id_reservation + "\n" +
                "Vorname : " + reservation.firstName + "\n" +
                "Nachname : " + reservation.lastName + "\n" +
                "Gruppenname : " + reservation.groupName + "\n" +
                "Anzahl der Fahrräder: " + reservation.numberBikes + "\n" + " \n" +
                "Es ist jedoch möglich, dass es genügend Plätze in einem anderen Zeitplan gibt und wir empfehlen Ihnen, eine neue Buchung vorzunehmen.\n" +
                "Wir danken Ihnen für Ihr Vertrauen und hoffen, auf eine nachfolgende Anfrage von Ihnen zu antworten.\n" +
                " \n" +
                "Ihr ResaBike-Team";

            resolve(text)
        })
    },
    createEmailContact(name, email, textClient){
        return new Promise(function (resolve, reject){
            //Email that is sent to ResaBike from contact form
            //Data taken from the contact form
            var text = "Cet email a été envoyé depuis le site de ResaBike.\n" +
                " \n"+
                "Expéditeur : "+name+" \n"+
                "Email :  "+email+" \n"+
                "Texte : \n"+textClient+" \n";
            resolve(text)
        })
    },

    createTextPersonContact(reservation){
        return new Promise(function (resolve, reject){
            var text = "Une nouvelle réservation a été faite sur Resabike!\n" +
                " \n"+
                "Récapitulatif : \n"+" \n"+
                "Station-départ : "+reservation.from+"\n"+
                "Station-arrivée : "+reservation.to+"\n"+
                "Date : "+reservation.dateReservation.dataValues.day + "." + reservation.dateReservation.dataValues.month + "." + reservation.dateReservation.dataValues.year+"\n"+
                "Heure de départ : "+reservation.reservationJourneyReservation[0].journeyJourneyReservation.dataValues.horaire+"\n"+
                "N° de réservation : "+reservation.id_reservation+"\n"+
                "Prénom : "+reservation.firstName+"\n"+
                "Nom de famille : "+reservation.lastName+"\n"+
                "Nom de groupe : "+reservation.groupName+"\n"+
                "Nombre de vélos : "+reservation.numberBikes+"\n"+
                " \n"+
                "______________________________________________________________________________________________________"+" \n"+
                "A new booking was made on Resabike!\n" +
                " \n"+
                "Summary : \n"+" \n"+
                "Departure-station : "+reservation.from+"\n"+
                "Arrival-station : "+reservation.to+"\n"+
                "Date : "+reservation.dateReservation.dataValues.day + "." + reservation.dateReservation.dataValues.month + "." + reservation.dateReservation.dataValues.year+"\n"+
                "Departure Time : "+reservation.reservationJourneyReservation[0].journeyJourneyReservation.dataValues.horaire.substr(11, 5)+"\n"+
                "N° of reservation : "+reservation.id_reservation+"\n"+
                "First name : "+reservation.firstName+"\n"+
                "Last name : "+reservation.lastName+"\n"+
                "Group name : "+reservation.groupName+"\n"+
                "Number of bikes : "+reservation.numberBikes+"\n"+
                " \n"+
                "______________________________________________________________________________________________________"+" \n"+
                "Eine neue Reservierung wurde auf Resabike vorgenommen!\n" +
                " \n"+
                "Zusammenfassung : \n"+" \n"+
                "Abfahrtsstation : "+reservation.from+"\n"+
                "Ankunftsstation : "+reservation.to+"\n"+
                "Datum : "+reservation.dateReservation.dataValues.day + "." + reservation.dateReservation.dataValues.month + "." + reservation.dateReservation.dataValues.year+"\n"+
                "Abfahrtszeit : "+reservation.reservationJourneyReservation[0].journeyJourneyReservation.dataValues.horaire+"\n"+
                "Reservierungsnummer : "+reservation.id_reservation+"\n"+
                "Vorname : "+reservation.firstName+"\n"+
                "Nachname : "+reservation.lastName+"\n"+
                "Gruppenname : "+reservation.groupName+"\n"+
                "Anzahl der Fahrräder: "+reservation.numberBikes+"\n";

            resolve(text)
        })
    }

}