/*DO NOT EDIT THIS FILE UNLESS PERMISSION IS GRANTED FROM BACK-END TEAM
----
this file holds database names that are stored in Firebase*/

//constants for Firestore collections
export const COLLECTION_USERS = "Users";
export const COLLECTION_MENTORS = "Mentor";
export const COLLECTION_INTERNSHIP = "Internship";
    //constants for Internship statuses
    export const INTERNSHIP_STATUS_OPEN = "Open for Applications";
    export const INTERNSHIP_STATUS_REVIEW = "Applications are Under Review";
    export const INTERNSHIP_STATUS_CLOSED = "Applications are Now Closed";
export const COLLECTION_RELATIONAL_APPLICATIONS = "User->Internship(UID->IID,MID,Status)";

//constants for Storage names
export const STORAGE_RESUME = "resumes/";
