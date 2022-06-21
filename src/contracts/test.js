Moralis.Cloud.afterSave("DevBorrowerCreatedLoan", async (request) => {
  const confirmed = await request.object.get("confirmed");

  if (confirmed) {
    const borrower = await request.object.get("borrower");
    const loanId = await request.object.get("loanId");

    Moralis.Cloud.httpRequest({
      method: "PATCH",
      url: " https://n7eept3gsa.execute-api.us-east-1.amazonaws.com/dev/moralis/borrower-created-loan-transaction-status",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        "x-api-key": "uAi5j74FEyaWBtQNbbi7H2qXPKvRXtvS4QNJmq8E",
      },
      body: {
        borrower: borrower,
        loanId: loanId,
      },
    }).then(
      function (httpResponse) {
        // success
        logger.info(
          `☁️☁️☁️☁️----LAMBDA TRIGGERED TO UPDATE BORROWER LOAN CREATED STATUS----☁️☁️☁️☁️`
        );
      },
      function (httpResponse) {
        logger.error(
          "Request failed with response code " + httpResponse.status
        );
      }
    );
  }
});

Moralis.Cloud.beforeSave("DevBorrowerCreatedLoan", async (request) => {
  const confirmed = await request.object.get("confirmed");

  if (!confirmed) {
    const borrower = await request.object.get("borrower");
    const loanId = await request.object.get("loanId");
    const termsData = await request.object.get("termsData");
    const tokenData = await request.object.get("tokenData");

    Moralis.Cloud.httpRequest({
      method: "PUT",
      url: "https://n7eept3gsa.execute-api.us-east-1.amazonaws.com/dev/moralis/borrower-created-loan",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        "x-api-key": "uAi5j74FEyaWBtQNbbi7H2qXPKvRXtvS4QNJmq8E",
      },
      body: {
        borrower: borrower,
        loanId: loanId,
        termsData: termsData,
        tokenData: tokenData,
      },
    }).then(
      function (httpResponse) {
        logger.info(
          `☁️☁️☁️☁️----LAMBDA TRIGGERED FOR BORROWER LOAN CREATED----☁️☁️☁️☁️`
        );
      },
      function (httpResponse) {
        logger.error(
          "Request failed with response code " + httpResponse.status
        );
      }
    );
  }
});

Moralis.Cloud.beforeSaveFile((request) => {
  throw "Not Allowed";
});
