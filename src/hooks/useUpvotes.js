export default function useUpvotes() {
  const doUpvote = async (startupId, userId) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/v1/startups/${startupId}/upvotes`, 
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user_id: userId}),
        }
      );

      // if (!response.ok) {
      //   throw new Error("Failed to upvote");
      // }

      const data = await response.json();

      
      return data;
    } catch (error) {
      console.error("Error toggling upvote:", error);
      return null;
    }
  };

  const getUpvotes = async (startupId) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/v1/startups/${startupId}/upvotes`, 
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) throw new Error("Failed to fetch upvotes");

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching upvotes:", error);
      return null;
    }
  };

  return {
    getUpvotes,
    doUpvote,
  };
}
