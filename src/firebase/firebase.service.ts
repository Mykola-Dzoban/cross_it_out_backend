import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import admin, { ServiceAccount } from 'firebase-admin';
import { FirebaseFactory } from './firebase.factory';

@Injectable()
export class FirebaseService {
  private readonly firebaseCollections = {
    users: `${process.env.NODE_ENV}_users`,
  };

  private adminSDK: ServiceAccount;
  private firebaseApp: admin.app.App;
  private firebaseFirestore: admin.firestore.Firestore;
  private firebaseStorage: admin.storage.Storage;

  public users: FirebaseFactory<any>;

  constructor(private readonly configService: ConfigService<{}, true>) {
    this.adminSDK = {
      type: this.configService.get<string>('FIRE_ADMIN_TYPE', {
        infer: true,
      }),
      project_id: this.configService.get<string>('FIRE_ADMIN_PROJECT_ID', {
        infer: true,
      }),
      private_key_id: this.configService.get<string>(
        'FIRE_ADMIN_PRIVATE_KEY_ID',
        {
          infer: true,
        },
      ),
      private_key: this.configService.get<string>('FIRE_ADMIN_PRIVATE_KEY', {
        infer: true,
      }),
      client_email: this.configService.get<string>('FIRE_ADMIN_CLIENT_EMAIL', {
        infer: true,
      }),
      client_id: this.configService.get<string>('FIRE_ADMIN_CLIENT_ID', {
        infer: true,
      }),
      auth_uri: this.configService.get<string>('FIRE_ADMIN_AUTH_URI', {
        infer: true,
      }),
      token_uri: this.configService.get<string>('FIRE_ADMIN_TOKEN_URI', {
        infer: true,
      }),
      auth_provider_x509_cert_url: this.configService.get<string>(
        'FIRE_ADMIN_AUTH_PROVIDER_X509_CERT_URL',
        {
          infer: true,
        },
      ),
      client_x509_cert_url: this.configService.get<string>(
        'FIRE_ADMIN_CLIENT_X509_CERT_URL',
        {
          infer: true,
        },
      ),
    } as ServiceAccount;
    this.firebaseApp =
      admin.apps.length > 0
        ? admin.app()
        : admin.initializeApp({
            credential: admin.credential.cert(this.adminSDK as ServiceAccount),
          });
    this.firebaseFirestore = admin.firestore();
    this.firebaseStorage = admin.storage();

    this.users = new FirebaseFactory(
      this.firebaseFirestore,
      this.firebaseCollections.users,
    );
  }
}
