import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { Layout } from "../../components/layouts";

const inter = Inter({ subsets: ["latin"] });

export default function HomePage() {
  return (
    <Layout>
      <h1>Home page</h1>
    </Layout>
  );
}
