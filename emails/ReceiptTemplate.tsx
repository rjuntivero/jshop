import {
  Body,
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  // Link,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';

const baseUrl = 'http://localhost:3000';

const tailwindConfig = {
  theme: {
    extend: {
      colors: {
        'primary-light': '#F7F7F7',
        'secondary-light': '#FFFFFF',
        'secondary-dark': '#222222',
      },
      fontFamily: {
        nike: 'Arial, sans-serif',
      },
    },
  },
};

export default function ReceiptTemplate() {
  return (
    <Html>
      <Head />
      <Tailwind config={tailwindConfig}>
        <Body className="bg-white font-nike">
          <Preview>Get your order summary, estimated delivery date and more</Preview>

          <Container className="my-2 mx-auto w-[600px] max-w-full border border-[#E5E5E5]">
            {/* Header: Tracking Number */}
            <Section className="py-5 px-10 bg-primary-light">
              <Row>
                <Column>
                  <Text className="m-0 text-[14px] leading-[2] font-bold">Tracking Number</Text>
                  <Text className="mt-3 mb-0 font-medium text-[14px] leading-[1.4] text-[#6F6F6F]">
                    tracking number
                  </Text>
                </Column>
                {/* <Column align="right">
                <Link className="border border-solid border-[#929292] text-[16px] no-underline py-2 px-0 w-[220px] block text-center font-medium text-black">
                  Track Package
                </Link>
              </Column> */}
              </Row>
            </Section>

            <Hr className="border-[#E5E5E5] m-0" />

            {/* Main Message */}
            <Section className="py-10 px-8 text-center">
              <Img
                src={`${baseUrl}/globe.svg`}
                width="66"
                height="22"
                alt="Logo"
                className="mx-auto"
              />
              <Heading className="text-[32px] leading-[1.3] font-bold text-center -tracking-[1px]">
                It{`'`}s On Its Way.
              </Heading>
              <Text className="m-0 text-[14px] leading-[2] text-[#747474] font-medium">
                Thank you for your purchase. Your order is on its way.
              </Text>
            </Section>

            <Hr className="border-[#E5E5E5] m-0" />

            {/* Shipping Info */}
            <Section className="py-5 px-10">
              <Text className="m-0 text-[15px] leading-[2] font-bold">
                Shipping to: Customer Name
              </Text>
              <Text className="m-0 text-[14px] leading-[2] text-[#747474] font-medium">
                Customer Address
              </Text>
            </Section>

            <Hr className="border-[#E5E5E5] m-0" />

            {/* Order Summary */}
            <Section className="py-5 px-10">
              <Row>
                <Column className="w-[170px]">
                  <Text className="m-0 text-[14px] leading-[2] font-bold">Order Number</Text>
                  <Text className="mt-3 mb-0 font-medium text-[14px] leading-[1.4] text-[#6F6F6F]">
                    Order Number
                  </Text>
                </Column>
                <Column>
                  <Text className="m-0 text-[14px] leading-[2] font-bold">Order Date</Text>
                  <Text className="mt-3 mb-0 font-medium text-[14px] leading-[1.4] text-[#6F6F6F]">
                    Month Date, Year
                  </Text>
                </Column>
              </Row>
            </Section>

            <Hr className="border-[#E5E5E5] m-0" />

            {/* Recommended Products */}
            {/* <Section className="py-5 px-5">
            <Heading className="text-[24px] font-bold text-center">Top Picks For You</Heading>
            <Row className="py-5">
              <Column align="center" className="px-1">
                <Img
                  src={`${baseUrl}/static/nike-recomendation-1.png`}
                  alt="Product 1"
                  width="100%"
                />
                <Text className="m-0 text-[15px] pt-2 font-medium">USWNT 2022/23 Stadium Home</Text>
                <Text className="m-0 text-[15px] pt-1 text-[#747474]">
                  Women{`'`}s Nike Dri-FIT Jersey
                </Text>
              </Column>
            </Row>
          </Section> */}
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
