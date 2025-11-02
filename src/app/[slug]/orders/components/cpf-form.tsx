"use client";

import z from "zod";
import { isValidCpf, removeCpfPunctuation } from "../../menu/helpers/cpf";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PatternFormat } from "react-number-format";
import { usePathname, useRouter } from "next/navigation";

const schema = z.object({
  cpf: z
    .string()
    .trim()
    .min(1, "CPF é obrigatório")
    .refine((value) => isValidCpf(value), "CPF Inválido"),
});

type FormSchema = z.infer<typeof schema>;
export function CpfForm() {
  const router = useRouter();
  const pathname = usePathname();

  const form = useForm<FormSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      cpf: "",
    },
  });

  const onSubmit = (data: FormSchema) => {
    router.push(`${pathname}?cpf=${removeCpfPunctuation(data.cpf)}`);
  };
  const handleCancel = () => router.back();

  return (
    <Drawer open>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Visualizar pedidos</DrawerTitle>
          <DrawerDescription>
            Insira seu CPF abaixo para visualizar seus pedidos!
          </DrawerDescription>
        </DrawerHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="cpf"
              render={({ field }) => (
                <FormItem className="px-4">
                  <FormLabel>CPF</FormLabel>
                  <FormControl>
                    <PatternFormat
                      format={"###.###.###-##"}
                      customInput={Input}
                      placeholder="___.___.___-__"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <DrawerFooter>
              <Button variant={"destructive"} className="w-full rounded-full">
                Confirmar
              </Button>
              <DrawerClose asChild>
                <Button
                  onClick={handleCancel}
                  className="w-full rounded-full"
                  variant="outline"
                >
                  Cancelar
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </form>
        </Form>
      </DrawerContent>
    </Drawer>
  );
}
