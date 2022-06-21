Moralis.Cloud.afterSave("dkLoanCreated", async (request) => {
  const confirmed = request.object.get("confirmed");
  const loanId = request.object.get("loanId");
  const borrower = request.object.get("borrower");
  const termsData = request.object.get("termsData");
  const tokenData = request.object.get("tokenData");

  if (confirmed) {
    Moralis.Cloud.httpRequest({
      method: "PATCH",
      url: "https://oqzle43dh3.execute-api.us-east-1.amazonaws.com/dev/moralis/update-loan-transaction-status",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        "x-api-key": "0PNdpwJFMH8NLL9xN0S8R8OrUSxj5sMg3j8hO6H8",
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
  } else {
    Moralis.Cloud.httpRequest({
      method: "PUT",
      url: "https://oqzle43dh3.execute-api.us-east-1.amazonaws.com/dev/moralis/borrower-created-loan-request",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        "x-api-key": "0PNdpwJFMH8NLL9xN0S8R8OrUSxj5sMg3j8hO6H8",
      },
      body: {
        borrower: borrower,
        loanId: loanId,
        termsData: termsData,
        tokenData: tokenData,
      },
    }).then(function (httpResponse) {
      logger.info(`👍👍👍----Put loan request triggered----👍👍👍👍`);
    });
  }
});

Moralis.Cloud.afterSave("dkLenderMadeLoanOffer", async (request) => {
  const confirmed = request.object.get("confirmed");
  const loanId = request.object.get("loanId");
  const lender = request.object.get("lender");
  const principle = request.object.get("principle");
  const interestRate = request.object.get("interestRate");
  const duration = request.object.get("duration");
  const expires = request.object.get("expires");

  if (!confirmed) {
    Moralis.Cloud.httpRequest({
      method: "PUT",
      url: "https://oqzle43dh3.execute-api.us-east-1.amazonaws.com/dev/moralis/lender-created-loan-offer",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        "x-api-key": "0PNdpwJFMH8NLL9xN0S8R8OrUSxj5sMg3j8hO6H8",
      },
      body: {
        loanId,
        lender,
        principle,
        interestRate,
        duration,
        expires,
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
  } else {
    Moralis.Cloud.httpRequest({
      method: "PATCH",
      url: "https://oqzle43dh3.execute-api.us-east-1.amazonaws.com/dev/moralis/update-loan-offer-transaction-status",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        "x-api-key": "0PNdpwJFMH8NLL9xN0S8R8OrUSxj5sMg3j8hO6H8",
      },
      body: {
        loanId,
        lender,
      },
    }).then(function (httpResponse) {
      logger.info(`👍👍👍----Put loan request triggered----👍👍👍👍`);
    });
  }
});

Moralis.Cloud.afterSave("dkBorrowerAcceptOffer", async (request) => {
  const confirmed = request.object.get("confirmed");
  const loanId = request.object.get("loanId");
  const borrower = request.object.get("borrower");
  const lender = request.object.get("lender");
  const loanTerms = request.object.get("loanTerms");

  if (!confirmed) {
    Moralis.Cloud.httpRequest({
      method: "PATCH",
      url: "https://oqzle43dh3.execute-api.us-east-1.amazonaws.com/dev/moralis/accept-loan-offer",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        "x-api-key": "0PNdpwJFMH8NLL9xN0S8R8OrUSxj5sMg3j8hO6H8",
      },
      body: {
        loanId: loanId,
        borrower: borrower,
        lender: lender,
        loanTerms: loanTerms,
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
  } else {
    Moralis.Cloud.httpRequest({
      method: "PATCH",
      url: "https://oqzle43dh3.execute-api.us-east-1.amazonaws.com/dev/moralis/update-accept-loan-offer",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        "x-api-key": "0PNdpwJFMH8NLL9xN0S8R8OrUSxj5sMg3j8hO6H8",
      },
      body: {
        loanId: loanId,
        borrower: borrower,
        lender: lender,
      },
    }).then(function (httpResponse) {
      logger.info(`👍👍👍----Put loan request triggered----👍👍👍👍`);
    });
  }
});

Moralis.Cloud.afterSave("dkLoanRepaid", async (request) => {
  const confirmed = request.object.get("confirmed");
  const loanId = request.object.get("loanId");
  const borrower = request.object.get("borrower");
  const lender = request.object.get("lender");

  if (confirmed) {
    Moralis.Cloud.httpRequest({
      method: "PUT",
      url: "https://oqzle43dh3.execute-api.us-east-1.amazonaws.com/dev/moralis/put-loan-to-repaid",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        "x-api-key": "0PNdpwJFMH8NLL9xN0S8R8OrUSxj5sMg3j8hO6H8",
      },
      body: {
        loanId: loanId,
        borrower: borrower,
        lender: lender,
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

Moralis.Cloud.afterSave("dkLenderWithdrewCollateral", async (request) => {
  const confirmed = request.object.get("confirmed");
  const loanId = request.object.get("loanId");
  const lender = request.object.get("lender");
  const borrower = request.object.get("borrower");

  if (confirmed) {
    Moralis.Cloud.httpRequest({
      method: "PUT",
      url: "https://oqzle43dh3.execute-api.us-east-1.amazonaws.com/dev/moralis/put-loan-to-default",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        "x-api-key": "0PNdpwJFMH8NLL9xN0S8R8OrUSxj5sMg3j8hO6H8",
      },
      body: {
        loanId: loanId,
        lender: lender,
        borrower: borrower,
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

Moralis.Cloud.afterSave("dkBorrowerWithdrewCollateral", async (request) => {
  const confirmed = request.object.get("confirmed");
  const loanId = request.object.get("loanId");
  const lender = request.object.get("lender");
  const borrower = request.object.get("borrower");

  if (confirmed) {
    Moralis.Cloud.httpRequest({
      method: "PUT",
      url: "https://oqzle43dh3.execute-api.us-east-1.amazonaws.com/dev/moralis/cancel-loan",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        "x-api-key": "0PNdpwJFMH8NLL9xN0S8R8OrUSxj5sMg3j8hO6H8",
      },
      body: {
        loanId: loanId,
        borrower: borrower,
        lender: lender,
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

Moralis.Cloud.beforeSaveFile((request) => {
  throw "Not Allowed";
});
