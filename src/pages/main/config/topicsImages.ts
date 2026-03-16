import jsTopicImage from "../../../assets/javaScript.jpg";
import tsTopicImage from "../../../assets/typeScript.jpg";
import algorithmsTopicImage from "../../../assets/algorithms.jpg";
import type { TopicItemId } from "../data/mainPageData";

export const topicsImages = {
  "core-javascript": jsTopicImage,
  typescript: tsTopicImage,
  algorithms: algorithmsTopicImage,
} satisfies Record<TopicItemId, string>;
