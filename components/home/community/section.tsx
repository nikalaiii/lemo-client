import Thread from "@/components/community/thread";
import { Container, Typography } from "@mui/material";

const EXAMPLE_THREAD = {
  id: "123123123",
  title: "Welcome to the Lemo Community!",
  author: "Nikalaiii",
  createdAt: "2024-06-01T12:00:00Z",
  content: [
    {
      id: "1",
      type: "text",
      data: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consequuntur id reprehenderit reiciendis hic suscipit veritatis accusantium quaerat mollitia vel, amet illum possimus officia, assumenda, distinctio cupiditate! Suscipit aliquam libero illo iusto quasi molestias? Corporis, modi culpa consequuntur minima hic magni! Ipsa dolor eum error earum itaque dolores eius consequatur ducimus!",
    },
    {
      id: "2",
      type: "image",
      data: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS22u1oeNWu6jjLO2GkC4KHL7KL8gqsdWlvzQ&s",
    },
    {
      id: "3",
      type: "link",
      data: "https://www.deviantart.com/tornadovda/art/Songbird-Animated-Wallpaper-992928733",
      subData: "Community Guidelines",
    },
  ],
  comments: 12,
  likes: 34,
};

const Community = () => {
  return (
    <Container
      sx={{
        position: "relative",
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        maxWidth: "1200px",
        maxHeight: "90vh",
        margin: "auto",
        backgroundColor: "#000",
      }}
    >
      <Typography
        variant="h2"
        sx={{
          fontWeight: 800,
          fontSize: { xs: "32px", md: "48px" },
          mb: 4,
        }}
      >
        Meet Our Community!
      </Typography>
      <Thread
        id={EXAMPLE_THREAD.id}
        title={EXAMPLE_THREAD.title}
        author={EXAMPLE_THREAD.author}
        content={EXAMPLE_THREAD.content}
        comments={EXAMPLE_THREAD.comments}
        likes={EXAMPLE_THREAD.likes}
        createdAt={EXAMPLE_THREAD.createdAt}
      />
    </Container>
  );
};

export default Community;
