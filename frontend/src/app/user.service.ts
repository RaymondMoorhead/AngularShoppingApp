import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './user';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private uri = 'http://localhost:8080/user';  // URL to web api

    httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin':'*',
        'Content-Type': 'application/json'
      })
    };

    constructor(
        private http: HttpClient) {}

    /** GET user exists by name from the server */
    getUserExistsByName(name: string): Observable<boolean> {
        const url = `${this.uri}/exists/${name}`;
        return this.http.get<boolean>(url);
    }

    /** GET users from the server */
    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(this.uri);
    }

    /** GET user by name and password. Will 404 if id not found */
    getUserByNameAndPassword(name: string, password: string): Observable<User> {
        const url = `${this.uri}/${name}/${password}`;
        return this.http.get<User>(url);
    }

    /** GET user by id. Will 404 if id not found */
    getUserById(id: number): Observable<User> {
        const url = `${this.uri}/${id}`;
        return this.http.get<User>(url);
    }

    /** PUT: update the user on the server */
    updateUser(user: User): Observable<any> {
        return this.http.put(this.uri + '/' + user.id, user, this.httpOptions);
    }

    /** POST: add a new user to the server */
    addUser(user: User): Observable<User> {
        return this.http.post<User>(this.uri, user, this.httpOptions);
    }

    /** DELETE user by id. Will 404 if id not found */
    deleteUser(id: number): Observable<User> {
        const url = `${this.uri}/${id}`;
        return this.http.delete<User>(url);
    }
  }