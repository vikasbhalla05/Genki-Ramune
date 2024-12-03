import ProductList from "@/components/Home/ProductList";
import { LoadingState, ErrorState, EmptyState } from "@/components/Global/States";
import Banner from "@/components/Home/Banner";
import { fetchFromApi } from "@/utils/api";
import BrandMetrics from "@/components/Home/BrandMetrics";
import VideoFeed from "@/components/Home/VideoFeed";
import defaults from "@/utils/defaults";

export const metadata = {
  title: 'Genki Ramune',
  description: 'Refreshing soda drinks for all ages!',
};

export default async function Home() {
  const id = "43"; // Default to ID 43
  const queryParams = { id, _fields: "acf", acf_format: "standard" };

  try {
    const pageData = await fetchFromApi(`/pages/${id}`, queryParams, "wp");

    // Validate `acf` data existence
    if (!pageData?.acf) {
      return <EmptyState message="Page Not Found" height="100vh" />;
    }

    const {
      banner_button = null,
      banner_heading = "Default Heading",
      banner_image_desktop = defaults.images.desktop,
      banner_image_mobile = defaults.images.mobile,
      banner_text = "",
      banner_url = "#",
      product_list_title = "Products List Title",
      product_list_subtitle = "",
      brand_metrics_title = "Brand Milestones & Metrics",
      brand_metrics_subtitle = "",
      brand_metrics = [],
      video_title = "Videos",
      video_subtitle = "",
      videos_feed = [],
    } = pageData?.acf;

    const bannerProps = {
      heading: banner_heading,
      text: banner_text,
      button: banner_button,
      desktopImage: banner_image_desktop,
      mobileImage: banner_image_mobile,
      url: banner_url,
    };

    const productListProps = {
      title: product_list_title,
      subtitle: product_list_subtitle,
      tag: "16", // Consider passing this dynamically
    };

    const brandMetricsProps = {
      title: brand_metrics_title,
      subtitle: brand_metrics_subtitle,
      metrics: Array.isArray(brand_metrics) ? brand_metrics : [],
    };

    const videoFeedProps = {
      title: video_title,
      subtitle: video_subtitle,
      videos: Array.isArray(videos_feed) ? videos_feed : [],
    };

    return (
      <>
        <Banner {...bannerProps} />
        <ProductList {...productListProps} />
        <BrandMetrics {...brandMetricsProps} />
        <VideoFeed {...videoFeedProps} />
      </>
    );
  } catch (error) {
    console.error("Error fetching page data:", error.message || error);
    return <ErrorState message="Error fetching page." height="100vh" />;
  }
}
