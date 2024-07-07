import deepCopy from "../utils/deepCopy";

export const FLASK_API_BASE_URL = "http://127.0.0.1:5001";
export const NEXT_API_BASE_URL = "http://localhost:3000";

export const initialFormState = () =>
    deepCopy({
        accountId: {
            label: "Account Id",
            value: "",
            required: true,
            error: {
                isError: false,
                showError: false,
            },
        },
        nickname: {
            label: "Nickname",
            value: "",
            required: true,
            error: {
                isError: false,
                showError: false,
            },
        },
        likelihoodToWatch: {
            label: "Likelihood to Watch",
            value: "",
            required: false,
        },
        likelihoodToComment: {
            label: "Likelihood to Comment",
            value: "",
            required: false,
        },
        likelihoodToLike: {
            label: "Likelihood to Like",
            value: "",
            required: false,
        },
    });

export const allowedAccountIds = ["crystaalbleee", "haayhay"];

export const formState_Set1 = () =>
    deepCopy({
        accountId: {
            label: "Account Id",
            value: "crystaalbleee",
            required: true,
            error: {
                isError: false,
                showError: true,
            },
            disabled: true,
        },
        nickname: {
            label: "Nickname",
            value: "Crystal Le",
            required: true,
            error: {
                isError: false,
                showError: true,
            },
            disabled: true,
        },
        likelihoodToWatch: {
            label: "Likelihood to Watch",
            value: "0.101304049416609",
            required: false,
            disabled: true,
        },
        likelihoodToComment: {
            label: "Likelihood to Comment",
            value: "0.00294599018003273",
            required: false,
            disabled: true,
        },
        likelihoodToLike: {
            label: "Likelihood to Like",
            value: "0.0983580592365767",
            required: false,
            disabled: true,
        },
    });

export const formState_Set2 = () =>
    deepCopy({
        accountId: {
            label: "Account Id",
            value: "haayhay",
            required: true,
            error: {
                isError: false,
                showError: true,
            },
            disabled: true,
        },
        nickname: {
            label: "Nickname",
            value: "Haley",
            required: true,
            error: {
                isError: false,
                showError: true,
            },
            disabled: true,
        },
        likelihoodToWatch: {
            label: "Likelihood to Watch",
            value: "0.00420577909802862",
            required: false,
            disabled: true,
        },
        likelihoodToComment: {
            label: "Likelihood to Comment",
            value: "0.000200378071833648",
            required: false,
            disabled: true,
        },
        likelihoodToLike: {
            label: "Likelihood to Like",
            value: "0.00400540102619497",
            required: false,
            disabled: true,
        },
    });
