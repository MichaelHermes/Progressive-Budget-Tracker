let db;
// Create a new db request for a "BudgetTracker" database.
const request = window.indexedDB.open('BudgetTracker', 1);

request.onupgradeneeded = function (event) {
	// Create an object store and set autoIncrement to true
	event.target.result.createObjectStore('TransactionStore', {
		autoIncrement: true,
	});
};

request.onsuccess = function (event) {
	db = event.target.result;

	if (navigator.onLine) {
		checkDatabase();
	}
};

/** If there was an error opening the request to the database, we'll log the error. */
request.onerror = function (event) {
	// log error here
	console.error('An error occurred connecting to the database!', event);
};

/** This method is used to record an "offline" transaction into our "BudgetTracker" IndexedDB database. */
function saveRecord(record) {
	// Create a transaction on the db with 'readwrite' access
	const transaction = db.transaction(['TransactionStore'], 'readwrite');
	const budgetObjectStore = transaction.objectStore('TransactionStore');
	// Add the transaction record to the db.
	budgetObjectStore.add(record);
}

/** This method is used to bulk upload any "offline" transactions recorded in the "BudgetTracker" IndexedDB to the persistent datastore (i.e. MongoDB). */
function checkDatabase() {
	// Retrieve all transactions from the "offline" object store.
	let transaction = db.transaction(['TransactionStore']);
	let budgetObjectStore = transaction.objectStore('TransactionStore');
	const getAll = budgetObjectStore.getAll();

	// Upload those transactions to MongoDB to persist them.
	getAll.onsuccess = function () {
		if (getAll.result.length > 0) {
			fetch('/api/transaction/bulk', {
				method: 'POST',
				body: JSON.stringify(getAll.result),
				headers: {
					Accept: 'application/json, text/plain, */*',
					'Content-Type': 'application/json',
				},
			})
				.then(response => response.json())
				.then(() => {
					// If we successfully uploaded the offline transactions, we can safely clear them out of our IndexedDB database.
					transaction = db.transaction(['TransactionStore'], 'readwrite');
					budgetObjectStore = transaction.objectStore('TransactionStore');
					budgetObjectStore.clear();
				});
		}
	};
}

// Listen for the application coming back online
window.addEventListener('online', checkDatabase);
