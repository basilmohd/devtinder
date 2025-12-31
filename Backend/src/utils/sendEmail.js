const { sesClient } = require("./sesClient");
const { SendEmailCommand } = require("@aws-sdk/client-ses");

const createSendEmailCommand = (toAddress, fromAddress) => {
    return new SendEmailCommand({
        Destination: {
            /* required */
            CcAddresses: [
                /* more items */
            ],
            ToAddresses: [
                toAddress,
                /* more To-email addresses */
            ],
        },
        Message: {
            /* required */
            Body: {
                /* required */
                Html: {
                    Charset: "UTF-8",
                    Data: "<h1>Test Email</h1>",
                },
                Text: {
                    Charset: "UTF-8",
                    Data: "Test Email",
                },
            },
            Subject: {
                Charset: "UTF-8",
                Data: "Test Email",
            },
        },
        Source: fromAddress,
        ReplyToAddresses: [
            /* more items */
        ],
    });
};

const run = async () => {
    const sendEmailCommand = createSendEmailCommand(
        "stunningbasil@gmail.com",
        "basil@devtraining.online",
    );

    try {
        console.log("Sending email through SES");
        return await sesClient.send(sendEmailCommand);
    } catch (caught) {
        console.log("Failed to send email through SES");
        if (caught instanceof Error && caught.name === "MessageRejected") {
            /** @type { import('@aws-sdk/client-ses').MessageRejected} */
            const messageRejectedError = caught;
            return messageRejectedError;
        }
        throw caught;
    }
};

// snippet-end:[ses.JavaScript.email.sendEmailV3]
module.exports = { run };