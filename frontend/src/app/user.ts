export enum UserPrivilage {
  Standard = 0,
  Admin
}

export class User {
    public id: number;
    public name: string;
    public password: string;
    public email: string;
    public privilage: UserPrivilage;

    constructor(id, name, password, email, privilage) {
      this.id = id;
      this.name = name;
      this.password = password;
      this.email = email;
      this.privilage = privilage;
    }

    toString() {
      return `id: ${this.id}, name: ${this.name}, password: ${this.password}, email: ${this.email}, privilage: ${this.privilage}`;
    }
  }