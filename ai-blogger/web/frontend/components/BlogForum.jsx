import { useState } from "react";
import {
  Card,
  Heading,
  TextContainer,
  DisplayText,
  TextStyle
} from "@shopify/polaris";
import { Toast } from "@shopify/app-bridge-react";
import { useAppQuery, useAuthenticatedFetch } from "../hooks";

export function BlogForum() {
  const emptyToastProps = { content: null };
  const blog = "";
  const [isLoading, setIsLoading] = useState(false);
  const [toastProps, setToastProps] = useState(emptyToastProps);
  const [blogText, setBlogText] = useState(blog);
  const fetch = useAuthenticatedFetch();

  const toastMarkup = toastProps.content && (
    <Toast {...toastProps} onDismiss={() => setToastProps(emptyToastProps)} />
  );

  const handleRequest = async () => {
    setIsLoading(true);
    const response = await fetch("/api/gpt/blogheader?text=test");
    if (response.ok) {
      setToastProps({ content: "Blog created" });
      setBlogText(await response.text());
      setIsLoading(false);
    } else {
      setIsLoading(false);
      setToastProps({
        content: "There was an error creating your blog",
        error: true,
      });
    }
  };

  return (
    <>
      {toastMarkup}
      <Card
        title="AI Blogger"
        sectioned
        primaryFooterAction={{
          content: "Request blog",
          onAction: handleRequest,
          loading: isLoading,
        }}
      >
        <TextContainer spacing="loose">
          <Heading element="h4">
            Blog
            <DisplayText size="medium">
              <TextStyle variation="strong">
                {blogText}
              </TextStyle>
            </DisplayText>
          </Heading>
        </TextContainer>
      </Card>
    </>
  );
}
