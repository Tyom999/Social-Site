import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient) {
  }

  addPost(data): Observable<any> {
    return this.http.post<any>('posts/add-post', data);
  }
  addComment(data): Observable<any> {
    return this.http.post<any>('posts/add-comment', data);
  }
  addReply(data): Observable<any> {
    return this.http.post<any>('posts/add-reply', data);
  }
  getComments(id): Observable<any> {
    return this.http.get<any>(`posts/comments/${id}`)
  }
  getReplies(id): Observable<any> {
    return this.http.get<any>(`posts/replies/${id}`)
  }

  getAllPosts() {
    return this.http.get('posts/all-posts');
  }
  getAllMsg(data): Observable<any> {
    return this.http.post('chats/getAllMsg', data);
  }
  getRatingById(id): Observable<any> {
    return this.http.get(`chats/getRatingById/${id}`);
  }
  setRate(data): Observable<any> {
    return this.http.post('chats/setRate', data);
  }


}
