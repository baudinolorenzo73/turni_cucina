# Versione 2 — 30 settembre 2026

## Correzioni

- La soglia di formazione conta solo affiancamenti nei mesi precedenti e, nel mese corrente, nei giorni precedenti al turno. I mesi futuri non abilitano i turni passati.
- Il salvataggio aggiorna il piano mensile anche dopo le modifiche manuali. Le presenze a squadra e gli affiancamenti partecipano ai controlli di riposo e continuità.
- Controlli aggiunti per turni scoperti, turni fissi non rispettati, affiancamenti incompatibili, nomi sconosciuti e indisponibilità degli affiancati.
- I weekend sono conteggiati come weekend distinti. Il massimo settimanale conta i giorni di presenza e include la parte della stessa settimana nel mese precedente.
- Le deroghe dei turni fissi restano consentite e vengono segnalate. Prima di esportare un piano con anomalie viene chiesta conferma.
- Backup verificati prima dell'importazione, con controllo delle strutture interne. Un errore di salvataggio non viene più nascosto.
- Cache offline isolata per percorso: non cancella le cache delle altre applicazioni. Le risposte HTTP non valide non sovrascrivono la pagina offline.
- PDF con paginazione automatica, testi a capo, riepiloghi su più pagine e dettagli completi per le squadre numerose.
- Annullare la condivisione non avvia più un download non richiesto.

## Miglioramenti

- Calcolo in un Web Worker, creato dai medesimi metodi testati: non richiede servizi esterni. Pulsante per annullare il calcolo.
- Controllo di disponibilità prima dei tentativi: indica giorno e ruolo senza candidati.
- Il messaggio di ricerca fallita non sostiene più che i vincoli siano certamente impossibili.
- Ripristino dei nuovi piani mensili, insieme a persone, profili e vincoli. Lo storico non viene più eliminato dopo sei mesi.
- Annullamento/ripristino per assegnazioni, affiancamenti, blocco dei turni, rimozione persone, generazione, importazione e ripristino dei piani. La cronologia è temporanea, fino a 20 operazioni.
- Promemoria per scaricare un backup e migrazione dei piani correnti della versione precedente.

## Verifiche e limiti

- Test automatici di regressione in `tests/regression.cjs` (Node.js, nessuna dipendenza esterna).
- Verifica strutturale degli export Word/Excel e verifica delle pagine PDF con 40 persone e nomi lunghi.
- La formazione è calcolata a partire dagli affiancamenti programmati e archiviati; non esiste un registro delle presenze effettive. Se un affiancamento viene annullato, va rimosso dal piano.
- I vecchi mesi archiviati non contengono i vincoli originali: restano disponibili per la continuità, ma non possono essere ripristinati come progetto completo. Il piano corrente della versione precedente viene migrato quando la sua impronta è coerente.
- Il generatore continua a usare una ricerca euristica: può non trovare una soluzione che esiste. Le modifiche manuali forzate e le deroghe dei turni fissi restano possibili e segnalate.
- I PDF usano caratteri occidentali; nomi con caratteri non supportati possono richiedere la stampa del browser.
- Il browser di prova non era disponibile nell'ambiente: installazione PWA, interfaccia e funzionamento sul tablet richiedono una verifica sul dispositivo.
