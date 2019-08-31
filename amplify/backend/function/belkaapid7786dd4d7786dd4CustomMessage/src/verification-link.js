
exports.handler = (event, context, callback) => {
  // Define the URL that you want the user to be directed to after verification is complete
  if (event.triggerSource === 'CustomMessage_SignUp' || event.triggerSource === 'CustomMessage_ResendCode') {
    const { codeParameter } = event.request;
    const { region, userName } = event;
    const { clientId } = event.callerContext;
    const redirectUrl = `${process.env.REDIRECTURL}/email-confirm/?username=${userName}`;
    // TODO get resourceName from function-parameters.json file
    // function name includes prefix
    const resourceName = process.env.RESOURCENAME || process.env.AWS_LAMBDA_FUNCTION_NAME;
    const resourcePrefix = resourceName.split('CustomMessage')[0];
    // const resourcePrefix = process.env.RESOURCENAME.split('CustomMessage')[0];

    const hyphenRegions = [
      'us-east-1',
      'us-west-1',
      'us-west-2',
      'ap-southeast-1',
      'ap-southeast-2',
      'ap-northeast-1',
      'eu-west-1',
      'sa-east-1',
    ];

    const seperator = hyphenRegions.includes(region) ? '-' : '.';

    const payload = Buffer.from(JSON.stringify({
      userName,
      redirectUrl,
      region,
      clientId,
    })).toString('base64');
    const bucketUrl = `http://${resourcePrefix}verificationbucket-${process.env.ENV}.s3-website${seperator}${region}.amazonaws.com`;
    const url = `${bucketUrl}/?data=${payload}&code=${codeParameter}`;
    const link = `<a href="${url}" target="_blank" rel="noopener noreferrer">Verfiy email</a>`;
    const message = `${process.env.EMAILMESSAGE}. \n ${link}`;
    event.response.smsMessage = message;
    event.response.emailSubject = process.env.EMAILSUBJECT;
    event.response.emailMessage = message;
    console.log('CustomMessage_SignUp event.response', event.response);
    callback(null, event);
  } else if (event.triggerSource === 'CustomMessage_ForgotPassword') {
    const { codeParameter } = event.request;
    const { userName } = event;
    // TODO encode to base64 or urlstring?
    const email = event.request.userAttributes.email;
    const url = `${process.env.REDIRECTURL}/change-password/?username=${userName}&code=${codeParameter}&email=${email}`;
    const link = `<a href="${url}" target="_blank" rel="noopener noreferrer">Change password</a>`;
    const message = `Please click the link below to restore password. \n ${link}`;
    event.response.smsMessage = message;
    event.response.emailSubject = 'Restore password';
    event.response.emailMessage = message;
    console.log('CustomMessage_ForgotPassword event.response', event.response);
    callback(null, event);
  } else {
    callback(null, event);
  }
};
