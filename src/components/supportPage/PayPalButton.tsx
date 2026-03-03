"use client";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

interface Props {
  amount: number;
  onSuccess: () => void;
}

export const PayPalButton = ({ amount, onSuccess }: Props) => {
  return (
    <PayPalScriptProvider
      options={{
        clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "", // Corregido: clientId en camelCase
        currency: "USD",
        intent: "capture",
      }}
    >
      <PayPalButtons
        style={{
          layout: "vertical",
          color: "blue",
          shape: "pill",
          label: "pay",
        }}
        forceReRender={[amount]} // Para que el botón se actualice si cambia el monto
        createOrder={(data, actions) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                amount: {
                  currency_code: "USD",
                  value: amount.toString(),
                },
              },
            ],
          });
        }}
        onApprove={async (data, actions) => {
          if (actions.order) {
            const details = await actions.order.capture();
            console.log("Pago exitoso:", details);
            onSuccess(); // Aquí dispararemos el confeti
          }
        }}
      />
    </PayPalScriptProvider>
  );
};
