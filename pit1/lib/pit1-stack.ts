import cdk = require('@aws-cdk/core');
import s3 = require('@aws-cdk/aws-s3')
import cognito = require('@aws-cdk/aws-cognito')

export class Pit1Stack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new s3.Bucket(this, 'pit1')

    const upAttr = cognito.UserPoolAttribute
    const userPoolAttrs = [
      upAttr.EMAIL,
      upAttr.FAMILY_NAME,
      upAttr.GIVEN_NAME,
      upAttr.PHONE_NUMBER,
      upAttr.PREFERRED_USERNAME,
      upAttr.PICTURE,
      upAttr.LOCALE
    ]

    const userPoolProps = {
      userPoolName: 'SaaS pit1',
      signInType: cognito.SignInType.USERNAME,
      usernameAliasAttributes: [upAttr.PHONE_NUMBER],
      userPoolAttrs: userPoolAttrs
    }

    const customAttrs = [
      "tenant_id",
      "plan",
      "company_name",
      "account_name",
      "role"
    ]

    const userPool = new cognito.UserPool(this, 'saasOnboard', userPoolProps)

  }
}
