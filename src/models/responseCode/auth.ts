enum SignInCode {
	SUCCESS = "SUCCESS",
	ERROR = "ERROR",
	MISMATCH = "MISMATCH",
	INVALID_REQUEST = "INVALID_REQUEST",
}

enum SignUpCode {
	SUCCESS = "SUCCESS",
	ERROR = "ERROR",
	DUPLICATE_ID = "DUPLICATE_ID",

	INVALID_REQUEST = "INVALID_REQUEST",
}

enum ChangePasswordCode {
	SUCCESS = "SUCCESS",
	ERROR = "ERROR",
	INVALID_REQUEST = "INVALID_REQUEST",

	MISMATCH = "MISMATCH",
}

enum DeleteUserCode {
	SUCCESS = "SUCCESS",
	ERROR = "ERROR",
	INVALID_REQUEST = "INVALID_REQUEST",
	MISMATCH = "MISMATCH"
}

export default {
	SignInCode,
	SignUpCode,
	ChangePasswordCode,
	DeleteUserCode
};