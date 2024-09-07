import { createContext, PropsWithChildren, useContext } from "react";
import { API_URL } from "./config";
import { useAuth } from "@/context/AuthContext";

const TweetsApiContext = createContext({});

const TweetsApiContextProvider = ({ children }: PropsWithChildren) => {
  const { authToken } = useAuth();

  const listTweets = async () => {
  
    const res = await fetch(`${API_URL}/tweet`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    if (res.status !== 200) {
      throw new Error("Error fetching tweets")
    }

    return await res.json();

  };

  const getTweet = async (id: string) => {
    const res = await fetch(`${API_URL}/tweet/${id}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    if (res.status !== 200) {
      throw new Error("Error fetching tweet")
    }

    return await res.json();
  };

  const createTweet = async (data: { content: string }) => {
    const res = await fetch(`${API_URL}/tweet`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (res.status !== 200) {
      throw new Error("Error creating tweet")
    }

    return await res.json();
  }

  return (<TweetsApiContext.Provider value={{
    listTweets,
    getTweet,
    createTweet,
    }}>
    {children}
  </TweetsApiContext.Provider>
  )
};
export default TweetsApiContextProvider;

export const useTweetApi = () => useContext(TweetsApiContext);


