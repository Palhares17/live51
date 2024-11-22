"use client";

import axios from "axios";
import { useEffect } from "react";

export default function Orders() {
  useEffect(() => {
    axios.get("/api/orders");
  }, []);

  return (
    <div>
      <h1>Pedidos realizados.</h1>
    </div>
  );
}
