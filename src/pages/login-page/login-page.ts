import { Component } from '@angular/core';
import {NavController, NavParams, AlertController, LoadingController} from 'ionic-angular';
import {ViewReceiptPage} from "../view-receipt-page/view-receipt-page";
import {TabsPage} from "../tabs/tabs";
import {LoginProvider} from "../../providers/loginProvider";
import {ShareService} from '../../services/ShareService';

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
// @IonicPage()
@Component({
  selector: 'page-login-page',
  templateUrl: 'login-page.html',
  providers: [LoginProvider]
})
export class LoginPage {
  data : any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public loginProvider: LoginProvider,
    public loadingCtrl: LoadingController,
    private shareService: ShareService
  ) {
    this.data = {login: "", password: ""}
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  public login() {

    let loader = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loader.present();
    this.loginProvider.login(this.data)
      .then(res => {
        loader.dismissAll();
        let result:any = res
        if(result.isLogined) {
          this.shareService.set('userToken', result.token);
          this.navCtrl.push(TabsPage);
        }
        else {
          let alert = this.alertCtrl.create({
            title: 'Error',
            subTitle: 'Wrong username or password.\nTry again.',
            buttons: ['OK']
          });
          alert.present();
        }
      })
  }

  public signup() {

    let loader = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loader.present();
    this.loginProvider.signup(this.data)
      .then(res => {
        loader.dismissAll();
        let result:any = res
        if(result.isLogined) {
          this.shareService.set('userToken', result.token);
          this.navCtrl.push(TabsPage);
        }
        else {
          let alert = this.alertCtrl.create({
            title: 'Error',
            subTitle: 'Username already used.\nTry another one.',
            buttons: ['OK']
          });
          alert.present();
        }
      })
  }
}
