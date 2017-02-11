import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { BarcodeScanner } from 'ionic-native';
import { AlertController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { Produit } from './produit';
import { ProduitService } from './produit.service';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    public model: Produit = new Produit();
    public reponse: Observable<Produit>;
    public errorMessage: string;

    constructor(
        public navCtrl: NavController, 
        public alertCtrl: AlertController,
        private produitService: ProduitService
    ) {}

    getInfoProduct(){

        BarcodeScanner.scan().then((result) => {

            if(!result.cancelled){
                
                this.reponse = this.produitService.getProduit(result.text);
                this.reponse.subscribe(
                    data => this.model = data,
                    error => this.errorMessage = <any>error
                );

            } else {
                
                let alert = this.alertCtrl.create({
                    title: 'Annulé',
                    subTitle: 'Vous avez annulé le scan',
                    buttons: ['OK']
                });
                alert.present();
            }
        }, (err) => {
            let alert = this.alertCtrl.create({
                title: 'Erreur',
                subTitle: 'Problème de scanning: ' + err,
                buttons: ['OK']
            });
            alert.present();
        });

    }
    
    
    
    update(){
        console.log('ok');

    }

}
