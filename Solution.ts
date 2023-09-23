/*Solution

SOLID Principles:
Single Responsibility Principle: La clase LibraryManager se ocupa únicamente de la lógica de la biblioteca, mientras que el servicio EmailService se ocupa del envío de correos electrónicos.
Open/Closed Principle: Las clases están abiertas para extensión (por ejemplo, añadiendo más tipos de notificaciones) pero cerradas para modificación.
Liskov Substitution Principle: User implementa la interfaz IObserver, lo que significa que se puede sustituir por cualquier otro objeto que también implemente la interfaz.
Dependency Inversion Principle: Se inyecta IEmailService en LibraryManager, lo que significa que LibraryManager no depende de una implementación concreta.

Inyección de Dependencias:
Inyectar IEmailService en LibraryManager.

Lambda Expressions:
Usar expresiones lambda en funciones como find y forEach.

Singleton Pattern:
Garantizar que solo haya una instancia de LibraryManager con el método getInstance.

Observer Pattern:
Los usuarios (User) se registran como observadores y son notificados cuando se añade un nuevo libro.

Builder Pattern:
Se utiliza para construir instancias de Book de una manera más limpia y escalable.

Refactorización:
eliminar el uso de ANY mejorar el performance

Aspectos (Opcional)
Puedes anadir logs de info, warning y error en las llamadas, para un mejor control

Diseño por Contrato (Opcional):
Puedes anadir validaciones en precondiciones o postcondiciones como lo veas necesario*/

//eliminamos any para darles valores especificos que queremos que nuestra clase devuelva


interface IEmailService {
    user: User;
    sendEmail(name: String, email: string): void;
}
class User {
    name: string;
    email: string;

    constructor(name: string, email: string) {
        this.name = name;
        this.email = email;
    }
}
class Book {
    title: string;
    author: string;
    ISBN: string;

    constructor(title: string, author: string, ISBN: string) {
        this.title = title;
        this.author = author;
        this.ISBN = ISBN;
    }
}
class Library {
    user:User[] = [];
    books: Book[] = [];

    addBook(book: Book) {
        this.books.push(book);
    }

    removeBook(ISBN: string) {
        const index = this.books.findIndex(b => b.ISBN === ISBN);
        if (index !== -1) {
            this.books.splice(index, 1);
        }
    }
    findBooks(query: string) {
        return this.books.filter(b => b.title.includes(query) || b.author.includes(query) || b.ISBN === query);
    }

}
class LibraryManager {
    library: Library;
    emailService: IEmailService;
    user: User;
    constructor(library: Library, emailService: IEmailService) {
        this.library = library;
        this.emailService = emailService;
    }
    addBook(title: string, author: string, ISBN: string, name: string, email: string) {
        const book = new Book(title, author, ISBN);
        this.library.addBook(book);
        //this.library.user.forEach(name => name.sendEmail(book));
    }
    removeBook(ISBN: string) {
        this.library.removeBook(ISBN);
    }
}

