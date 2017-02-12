import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Produit } from './produit';

@Injectable()

export class ProduitService {
    
    private url: string = 'http://88.191.72.111/api/produitInfo/';
    
    constructor(private http: Http){}
    
    getProduit(codeBarre: number): Observable<any>{
        
        return this.http.get(this.url + codeBarre)
            .map(this.extractData)
            .catch(this.handleError)
        ;
        
    }
    
    
    private extractData(res: Response) {
        
        let body = res.json();
        
        return new Produit(`${body.data.nom} - ${body.data.marque}`, body.data.code_barre, 10) || { };
    }
    
    private handleError (error: Response | any) {
        
        // In a real world app, we might use a remote logging infrastructure
        let errMsg: string;
        
        if (error instanceof Response) {
            
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
        
            errMsg = error.message ? error.message : error.toString();
        }
        
        console.error(errMsg);
        
        return Observable.throw(errMsg);
    }
    
}