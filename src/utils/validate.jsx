import * as yup from "yup";
import {specialtyApi} from "../redux/api/specialtyApi";
const signupSchema = yup.object({
	firstName: yup
		.string()
		.max(15, "Must be 15 characters or less")
		.required("FirstName is required"),
	lastName: yup
		.string()
		.max(15, "Must be 15 characters or less")
		.required("LastName is required"),
	email: yup.string().email("Email is invalid").required("Email is required"),
	password: yup
		.string()
		.min(6, "Password must be at least 6 characters")
		.required("Password is required"),
	confirm_password: yup
		.string()
		.min(6, "Password must be at least 6 characters")
		.required("Confirm Password is required")
		.oneOf([yup.ref("password"), null], "Passwords must match"),
	acceptedTerms: yup
		.boolean()
		.required("Required")
		.oneOf([true], "You must accept the terms and conditions."),
});

const userSchema = yup.object({
	firstName: yup.string().required("FirstName is required"),
	lastName: yup.string().required("LastName is required"),
	email: yup.string().email("Email is invalid").required("Email is required"),
	password: yup
		.string()
		.min(6, "Password must be at least 6 characters")
		.required("Password is required"),
	roleId: yup
		.string()
		.oneOf(["R1", "R2", "R3"], "Invalid Role Type")
		.required("Required"),
	genderId: yup
		.string()
		.oneOf(["M", "F", "O"], "Invalid Gender Type")
		.required("Required"),
	// positionId: yup
	// 	.string()
	// 	.oneOf(["P0", "P1", "P2", "P3", "P4"], "Invalid Position Type")
	// 	.required("Required"),
});

const loginSchema = yup.object({
	email: yup.string().email("Email is invalid").required("Email is required"),
	password: yup
		.string()
		.min(6, "Password must be at least 6 characters")
		.required("Password is required"),
});

const markdownSchema = yup.object({
	contentHTML: yup.string().required("Content is required"),
	description: yup.string().required("Description is required"),
	doctorId: yup.string().required("Doctor is required"),
	specialtyId: yup.string().required("Specialty is required"),
});
const scheduleSchema = yup.object({
	doctorId: yup.string().required("Doctor is required"),
	date: yup.string().required("Date is required"),
});

const bookingSchema = yup.object({
	fullName: yup.string().required("FullName is required"),
	email: yup.string().email("Email is invalid").required("Email is required"),
	address: yup.string().required("Address is required"),
	phone: yup.string().required("Phone is required"),
	gender: yup
		.string()
		.oneOf(["M", "F", "O"], "Invalid Gender Type")
		.required("Required"),
});

const specialtySchema = yup.object({
	nameVi: yup.string().required("Name is required"),
	nameEn: yup.string().required("Name is required"),
	description: yup.string().required("Description is required"),
});

export {
	signupSchema,
	loginSchema,
	userSchema,
	markdownSchema,
	scheduleSchema,
	specialtySchema,
	bookingSchema,
};
