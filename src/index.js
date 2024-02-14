const { program } = require("commander");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts.js");

// Функція має викликати відповідний метод з файлу contacts.js, передаючи йому необхідні аргументи.
// Результат роботи викликаної функції слід вивести в консоль.

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const allContacts = await listContacts();
      console.table(allContacts);
      break;

    case "get":
      const getContactbyID = await getContactById(id);
      console.log(getContactbyID);
      break;

    case "add":
      const newContact = await addContact({ name, email, phone });
      console.log(newContact);
      break;

    case "remove":
      const removeContactbyID = await removeContact(id);
      console.log(removeContactbyID);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(options);

// # Отримуємо і виводимо весь список контактів у вигляді таблиці (console.table)
// node index.js -a list

// # Отримуємо контакт по id і виводимо у консоль об'єкт контакту або null, якщо контакту з таким id не існує.
// node index.js -a get -i 05olLMgyVQdWRwgKfg5J6

// # Додаємо контакт та виводимо в консоль об'єкт новоствореного контакту
// node index.js -a add -n Mango -e mango@gmail.com -p 322-22-22

// # Видаляємо контакт та виводимо в консоль об'єкт видаленого контакту або null, якщо контакту з таким id не існує.
// node index.js -a remove -i qdggE76Jtbfd9eWJHrssH
