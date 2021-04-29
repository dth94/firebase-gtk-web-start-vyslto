// Import stylesheets
import "./style.css";
// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

import * as firebaseui from "firebaseui";

// Document elements

//Containers
const eventContainer = document.getElementById("event-details-container");
const authContainer = document.getElementById("firebaseui-auth-container");
const playContainer = document.getElementById("play-game");
const settingsContainer = document.getElementById("setting-container");
const settings = document.getElementById("setting-inputs");

//Buttons
const startRsvpButton = document.getElementById("startRsvp");
const editButton = document.getElementById("edit");
const runButton = document.getElementById("run");
const plusBI = document.getElementById("BIPlus");
const minusBI = document.getElementById("BIMinus");
const plusAI = document.getElementById("AIPlus");
const minusAI = document.getElementById("AIMinus");

const form = document.getElementById("settings");
const numberAttending = document.getElementById("number-attending");
const rsvpYes = document.getElementById("rsvp-yes");
const rsvpNo = document.getElementById("rsvp-no");
var buyInZahl;
var addInZahl;

var rsvpListener = null;
var guestbookListener = null;

async function main() {
  // Add Firebase project configuration object here
  var firebaseConfig = {
    apiKey: "AIzaSyAh66YuzgvTVSBxUkSq80KL9CPXvnFiCTE",
    authDomain: "web-app-9dcb0.firebaseapp.com",
    projectId: "web-app-9dcb0",
    storageBucket: "web-app-9dcb0.appspot.com",
    messagingSenderId: "366896883559",
    appId: "1:366896883559:web:ef470b9fdac2108b55b1c2"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  // Initialize the FirebaseUI widget using Firebase
  const ui = new firebaseui.auth.AuthUI(firebase.auth());

  // FirebaseUI config
  const uiConfig = {
    credentialHelper: firebaseui.auth.CredentialHelper.NONE,
    signInOptions: [
      // Email / Password Provider.
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccessWithAuthResult: function(authResult, redirectUrl) {
        // Handle sign-in.
        // Return false to avoid redirect.
        return false;
      }
    }
  };

  // Listen to RSVP button clicks
  startRsvpButton.addEventListener("click", () => {
    if (firebase.auth().currentUser) {
      // User is signed in; allows user to sign out
      firebase.auth().signOut();
    } else {
      // No user is signed in; allows user to sign in
      ui.start("#firebaseui-auth-container", uiConfig);
    }
  });

  // Listen to Edit button clicks
  editButton.addEventListener("click", () => {
    if ((settingsContainer.style.display = "disable")) {
      settingsContainer.style.display = "block";
      editButton.style.display = "none";
      settings.style.display = "none";
    }
  });

  // Listen to Run Button clicks
  runButton.addEventListener("click", () => {
    eventContainer.style.display = "NONE";
    authContainer.style.display = "NONE";
    settingsContainer.style.display = "NONE";
    settings.style.display = "NONE";
    runButton.style.display = "NONE";
  });

  //Listen to Plus Buy-In Button clicks
  plusBI.addEventListener("click", () => {
    firebase
      .firestore()
      .collection("settings")
      .orderBy("timestamp", "desc")
      .limit(1)
      .onSnapshot(snaps => {
        // Loop through documents in database
        snaps.forEach(doc => {
          buyInZahl = doc.data().buyIn;
        });
      });
    firebase
      .firestore()
      .collection("settings")
      .doc("settingDetails")
      .update({
        buyIn: buyInZahl + 1
      });
  });

  //Listen to Minus Buy-In Button clicks
  minusBI.addEventListener("click", () => {
    firebase
      .firestore()
      .collection("settings")
      .orderBy("timestamp", "desc")
      .limit(1)
      .onSnapshot(snaps => {
        // Loop through documents in database
        snaps.forEach(doc => {
          buyInZahl = doc.data().buyIn;
        });
      });
    if (buyInZahl > 0) {
      firebase
        .firestore()
        .collection("settings")
        .doc("settingDetails")
        .update({
          buyIn: buyInZahl - 1
        });
    }
  });

  //Listen to Plus Add-In Button clicks
  plusAI.addEventListener("click", () => {
    firebase
      .firestore()
      .collection("settings")
      .orderBy("timestamp", "desc")
      .limit(1)
      .onSnapshot(snaps => {
        // Loop through documents in database
        snaps.forEach(doc => {
          addInZahl = doc.data().AddIn;
        });
      });
    firebase
      .firestore()
      .collection("settings")
      .doc("settingDetails")
      .update({
        AddIn: addInZahl + 1
      });
  });

  //Listen to Minus Buy-In Button clicks
  minusAI.addEventListener("click", () => {
    firebase
      .firestore()
      .collection("settings")
      .orderBy("timestamp", "desc")
      .limit(1)
      .onSnapshot(snaps => {
        // Loop through documents in database
        snaps.forEach(doc => {
          addInZahl = doc.data().AddIn;
        });
      });
    if (addInZahl > 0) {
      firebase
        .firestore()
        .collection("settings")
        .doc("settingDetails")
        .update({
          AddIn: addInZahl - 1
        });
    }
  });

  // Listen to the form submission
  form.addEventListener("submit", e => {
    // Prevent the default form redirect
    e.preventDefault();

    //if (document.getElementById("players").value == " ") {
    // Write a new message to the database collection "guestbook"
    firebase
      .firestore()
      .collection("settings")
      .doc("settingDetails")
      .set(
        {
          players: document.getElementById("players").value,
          cost: document.getElementById("cost").value,
          costbuy: document.getElementById("costbuy").value,
          costadd: document.getElementById("costadd").value,
          blindtime: document.getElementById("blindtime").value,
          breakint: document.getElementById("breakint").value,
          breaktime: document.getElementById("breaktime").value,
          first: document.getElementById("first").value,
          second: document.getElementById("second").value,
          third: document.getElementById("third").value,
          sb1: document.getElementById("1sb").value,
          bb1: document.getElementById("1bb").value,
          sb2: document.getElementById("2sb").value,
          bb2: document.getElementById("2bb").value,
          sb3: document.getElementById("3sb").value,
          bb3: document.getElementById("3bb").value,
          sb4: document.getElementById("4sb").value,
          bb4: document.getElementById("4bb").value,
          sb5: document.getElementById("5sb").value,
          bb5: document.getElementById("5bb").value,
          sb6: document.getElementById("6sb").value,
          bb6: document.getElementById("6bb").value,
          sb7: document.getElementById("7sb").value,
          bb7: document.getElementById("7bb").value,
          sb8: document.getElementById("8sb").value,
          bb8: document.getElementById("8bb").value,
          sb9: document.getElementById("9sb").value,
          bb9: document.getElementById("9bb").value,
          sb10: document.getElementById("10sb").value,
          bb10: document.getElementById("10bb").value,
          timestamp: Date.now()
        },
        { merge: true }
      );

    // hide forular
    editButton.style.display = "block";
    settings.style.display = "block";
    runButton.style.display = "block";
    settingsContainer.style.display = "none";
    // Return false to avoid redirect
    return false;
    //}
  });

  // Listen to the current Auth state
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      startRsvpButton.textContent = "LOGOUT";
      // Show guestbook to logged-in users
      settingsContainer.style.display = "NONE";
      editButton.style.display = "block";
      settings.style.display = "block";
      runButton.style.display = "block";
      settingsContainer.style.display = "none";
    } else {
      startRsvpButton.textContent = "LOGIN";
      // Hide guestbook for non-logged-in users
      editButton.style.display = "none";
      settings.style.display = "none";
      runButton.style.display = "none";
      settingsContainer.style.display = "none";
    }
  });

  firebase
    .firestore()
    .collection("settings")
    .orderBy("timestamp", "desc")
    .limit(1)
    .onSnapshot(snaps => {
      // Loop through documents in database
      snaps.forEach(doc => {
        // Create an HTML entry for each document and add it to the chat
        const col = document.createElement("span");
        settings.appendChild(col);
        const head3 = document.createElement("h2");
        head3.textContent = "Einstellungen";
        col.appendChild(head3);
        const entry = document.createElement("p");
        entry.textContent = "Anzahl Spieler :  " + doc.data().players;
        col.appendChild(entry);
        const entry2 = document.createElement("p");
        const buyIn = document.createElement("p");
        buyIn.classList.add("inputSmall");
        col.appendChild(entry2);
        entry2.appendChild(buyIn);

        const col2 = document.createElement("span");
        col2.classList.add("col2");
        settings.appendChild(col2);
        const head = document.createElement("h2");
        head.textContent = "Einsätze";
        col2.appendChild(head);
        const test = document.createElement("p");
        const einsatzNorm = Math.floor(doc.data().players * doc.data().cost);
        test.textContent =
          "Einsatz :  " +
          einsatzNorm +
          ".-  ( " +
          doc.data().cost +
          ".- p.P. )";
        col2.appendChild(test);
        const entry3 = document.createElement("p");
        const einsatzBuy = Math.floor(doc.data().players * doc.data().costbuy);
        entry3.textContent =
          "Buy-In :  " +
          einsatzBuy +
          ".-  ( " +
          doc.data().costbuy +
          ".- p.P. )";
        col2.appendChild(entry3);
        const entry4 = document.createElement("p");
        const einsatzAddIn = Math.floor(
          doc.data().players * doc.data().costadd
        );
        entry4.textContent =
          "Add-In :  " +
          einsatzAddIn +
          ".-  ( " +
          doc.data().costadd +
          ".- p.P. )";
        col2.appendChild(entry4);
        const totalEinsatzPP =
          parseInt(doc.data().cost) +
          parseInt(doc.data().costadd) +
          parseInt(doc.data().costbuy);
        const totalEinsatz = einsatzNorm + einsatzBuy + einsatzAddIn;

        const col3 = document.createElement("span");
        col3.classList.add("col2");
        settings.appendChild(col3);
        const head1 = document.createElement("h2");
        head1.textContent = "Gewinnverteilung";
        col3.appendChild(head1);
        const entry5 = document.createElement("p");
        entry5.textContent =
          "1. Platz :  " +
          Math.floor(doc.data().first * 0.01 * totalEinsatz) +
          ".-  ( " +
          doc.data().first +
          "% )";
        col3.appendChild(entry5);
        const entry6 = document.createElement("p");
        entry6.textContent =
          "2. Platz :  " +
          Math.floor(doc.data().second * 0.01 * totalEinsatz) +
          ".-  ( " +
          doc.data().second +
          "% )";
        col3.appendChild(entry6);
        const entry7 = document.createElement("p");
        entry7.textContent =
          "3. Platz :  " +
          Math.floor(doc.data().third * 0.01 * totalEinsatz) +
          ".-  ( " +
          doc.data().third +
          "% )";
        col3.appendChild(entry7);

        const col4 = document.createElement("span");
        col4.classList.add("col2");
        settings.appendChild(col4);
        const head2 = document.createElement("h2");
        head2.textContent = "Blindstufen";
        col4.appendChild(head2);
        const entry8 = document.createElement("p");
        entry8.textContent =
          "Stufe 1 :  " + doc.data().sb1 + " / " + doc.data().bb1;
        col4.appendChild(entry8);
        const entry10 = document.createElement("p");
        entry10.textContent =
          "Stufe 2 :  " + doc.data().sb2 + " / " + doc.data().bb2;
        col4.appendChild(entry10);
        const entry12 = document.createElement("p");
        entry12.textContent =
          "Stufe 3 :  " + doc.data().sb3 + " / " + doc.data().bb3;
        col4.appendChild(entry12);
        const entry14 = document.createElement("p");
        entry14.textContent =
          "Stufe 4 :  " + doc.data().sb4 + " / " + doc.data().bb4;
        col4.appendChild(entry14);
        const entry16 = document.createElement("p");
        entry16.textContent =
          "Stufe 5 :  " + doc.data().sb5 + " / " + doc.data().bb5;
        col4.appendChild(entry16);

        const col5 = document.createElement("span");
        col5.classList.add("col2");
        settings.appendChild(col5);
        const entry18 = document.createElement("p");
        entry18.textContent =
          "Stufe 6 :  " + doc.data().sb6 + " / " + doc.data().bb6;
        col5.appendChild(entry18);
        const entry20 = document.createElement("p");
        entry20.textContent =
          "Stufe 7 :  " + doc.data().sb7 + " / " + doc.data().bb7;
        col5.appendChild(entry20);
        const entry22 = document.createElement("p");
        entry22.textContent =
          "Stufe 8 :  " + doc.data().sb8 + " / " + doc.data().bb8;
        col5.appendChild(entry22);
        const entry24 = document.createElement("p");
        entry24.textContent =
          "Stufe 9 :  " + doc.data().sb9 + " / " + doc.data().bb9;
        col5.appendChild(entry24);
        const entry26 = document.createElement("p");
        entry26.textContent =
          "Stufe 10 :  " + doc.data().sb10 + " / " + doc.data().bb10;
        col5.appendChild(entry26);

        //insert into play
        const playerTd = document.getElementById("player-in-game");
        const addinTd = document.getElementById("addin-in-game");
        const buyinTd = document.getElementById("buyin-in-game");
        const platz1Td = document.getElementById("platz-eins");
        const platz2Td = document.getElementById("platz-zwei");
        const platz3Td = document.getElementById("platz-drei");
        const timerTd = document.getElementById("timer");

        if (timerTd == " ") {
          timerTd.textContent = doc.data().blindtime;
        }

        playerTd.textContent = doc.data().players;
        addinTd.textContent = doc.data().AddIn;
        buyinTd.textContent = doc.data().buyIn;
        platz1Td.textContent =
          Math.floor(doc.data().first * 0.01 * totalEinsatz) + ".-";
        platz2Td.textContent =
          Math.floor(doc.data().second * 0.01 * totalEinsatz) + ".-";
        platz3Td.textContent =
          Math.floor(doc.data().third * 0.01 * totalEinsatz) + ".-";
      });
    });

  var countDownDate = new Date("Apr 30, 2021 15:37:25").getTime();
  var x = setInterval(function() {
    var now = new Date().getTime();

    // Find the distance between now and the count down date
    var distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the result in the element with id="demo"
    document.getElementById("timer").innerHTML =
      "00:" + minutes + ":" + seconds;

    // If the count down is finished, write some text
    if (distance < 0) {
      clearInterval(x);
      document.getElementById("demo").innerHTML = "EXPIRED";
    }
  }, 1000);
}
main();
