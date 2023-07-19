import { APIUrls, Response_Status } from "@/app/apiServices/ApiServiceConstants";
import AuthService, { addUser } from "@/app/apiServices/AuthService";
import axios from "axios";
import { RegisterFakeData, mockUserList } from "../../__fixtures__/authentication";

const URL = APIUrls.authUrl;

jest.mock("axios");

describe("AuthService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should add a user", async () => {
    const data = RegisterFakeData.userData;

    await AuthService.addUser(data);

    expect(axios.post).toHaveBeenCalledWith(URL, data);
  });

  it("should get user by email ID", async () => {
    const responseData = mockUserList;
    const data = { email: responseData[0].email };
    const expectedResponse = {
      data: responseData[0],
      status: Response_Status.OK,
    };

    (axios.get as jest.Mock).mockResolvedValue({ data: responseData, statusText: Response_Status.OK });

    const response = await AuthService.getUserByEmailId(data);

    expect(axios.get).toHaveBeenCalledWith(URL);

    expect(response).toEqual(expectedResponse);
  });

  it("should handle failure scenario when axios.post throws an error", async () => {
    const data = RegisterFakeData.userData;
    const errorMessage = "Failed to add user";

    (axios.post as jest.MockedFunction<typeof axios.post>).mockRejectedValue(new Error(errorMessage));

    await expect(addUser(data)).rejects.toThrow(errorMessage);
  });
});
