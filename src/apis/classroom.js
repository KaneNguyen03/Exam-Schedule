import apiInstance from "./config";

const getAllClassrooms = async () => {
  try {
    const data = await apiInstance.get("api/Classroom");
    return data;
  } catch (error) {
    throw new Error("Error geting classroom");
  }
};

const updateClassroom = async (data) => {
  try {
    const response = await apiInstance.put(
      `api/Classroom/${data.classroomId}`,
      {
        ClassroomId: data.classroomId,
        name: data.name,
        capacity: data.capacity,
      }
    );
    return response;
  } catch (error) {
    throw new Error("Error update classroom");
  }
};

const classroomApi = {
  getAllClassrooms,
  updateClassroom,
};

export default classroomApi;
