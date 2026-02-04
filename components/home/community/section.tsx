import Thread, { ThreadInterface } from "@/components/community/thread";
import { Box, Container, Typography } from "@mui/material";
import ThreadsCarousel from "./threads-carousel";
import RedirectLink from "@/components/shared/navigation/RedirectLink";

const EXAMPLE_THREADS: ThreadInterface[] = [
  {
    id: "34534534",
    title: "Welcome to the Lemo Community!",
    author: "Nikalaiii",
    createdAt: "2024-06-01T12:00:00Z",
    content: [
      {
        id: "1",
        type: "text",
        data: "Lorem ipsum dolor, /$link)LINK)https://music.youtube.com/watch?v=1S_8FDhc6bM&list=RDAMVM1S_8FDhc6bM sit amet consectetur adipisicing elit. Consequuntur id reprehenderit reiciendis hic suscipit veritatis accusantium quaerat mollitia vel, amet illum possimus officia, assumenda, distinctio cupiditate! Suscipit aliquam libero illo iusto quasi molestias? Corporis, modi culpa consequuntur minima hic magni! Ipsa dolor eum error earum itaque dolores eius consequatur ducimus!",
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
  },
  {
    id: "dghdfgh",
    title: "Welcome to the Lemo Community!",
    author: "Nikalaiii",
    createdAt: "2024-06-01T12:00:00Z",
    content: [
      {
        id: "1",
        type: "text",
        data: "Lorem ipsum dolor, /$link)LINK)https://music.youtube.com/watch?v=1S_8FDhc6bM&list=RDAMVM1S_8FDhc6bM sit amet consectetur adipisicing elit. Consequuntur id reprehenderit reiciendis hic suscipit veritatis accusantium quaerat mollitia vel, amet illum possimus officia, assumenda, distinctio cupiditate! Suscipit aliquam libero illo iusto quasi molestias? Corporis, modi culpa consequuntur minima hic magni! Ipsa dolor eum error earum itaque dolores eius consequatur ducimus!",
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
  },
  {
    id: "ghkghs",
    title: "Welcome to the Lemo Community!",
    author: "Nikalaiii",
    createdAt: "2024-06-01T12:00:00Z",
    content: [
      {
        id: "1",
        type: "text",
        data: "Lorem ipsum dolor, /$link)LINK)https://music.youtube.com/watch?v=1S_8FDhc6bM&list=RDAMVM1S_8FDhc6bM sit amet consectetur adipisicing elit. Consequuntur id reprehenderit reiciendis hic suscipit veritatis accusantium quaerat mollitia vel, amet illum possimus officia, assumenda, distinctio cupiditate! Suscipit aliquam libero illo iusto quasi molestias? Corporis, modi culpa consequuntur minima hic magni! Ipsa dolor eum error earum itaque dolores eius consequatur ducimus!",
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
  },
  {
    id: "kjl;dgk",
    title: "Welcome to the Lemo Community!",
    author: "Nikalaiii",
    createdAt: "2024-06-01T12:00:00Z",
    content: [
      {
        id: "1",
        type: "text",
        data: "Lorem ipsum dolor, /$link)LINK)https://music.youtube.com/watch?v=1S_8FDhc6bM&list=RDAMVM1S_8FDhc6bM sit amet consectetur adipisicing elit. Consequuntur id reprehenderit reiciendis hic suscipit veritatis accusantium quaerat mollitia vel, amet illum possimus officia, assumenda, distinctio cupiditate! Suscipit aliquam libero illo iusto quasi molestias? Corporis, modi culpa consequuntur minima hic magni! Ipsa dolor eum error earum itaque dolores eius consequatur ducimus!",
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
  },
  {
    id: "hjerrvhk.,",
    title: "Welcome to the Lemo Community!",
    author: "Nikalaiii",
    createdAt: "2024-06-01T12:00:00Z",
    content: [
      {
        id: "1",
        type: "text",
        data: "Lorem ipsum dolor, /$link)LINK)https://music.youtube.com/watch?v=1S_8FDhc6bM&list=RDAMVM1S_8FDhc6bM sit amet consectetur adipisicing elit. Consequuntur id reprehenderit reiciendis hic suscipit veritatis accusantium quaerat mollitia vel, amet illum possimus officia, assumenda, distinctio cupiditate! Suscipit aliquam libero illo iusto quasi molestias? Corporis, modi culpa consequuntur minima hic magni! Ipsa dolor eum error earum itaque dolores eius consequatur ducimus!",
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
  },
];

const Community = () => {
  return (
    <Container
      sx={{
        position: "relative",
        overflow: "hidden",
        justifyContent: "center",
        maxWidth: "100vw"
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


        <RedirectLink position="right" href="/community" title="See more Posts on our Community" size="large" />

      <ThreadsCarousel threads={EXAMPLE_THREADS} />
    </Container>
  );
};

export default Community;
