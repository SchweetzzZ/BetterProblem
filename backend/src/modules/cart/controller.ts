import {
  createCart,
  updateCart,
  deletCart,
  getCartById,
  getAllCart
} from "./service";

export const creteCartController = async (context: any) => {
  try {
    const cart = await createCart(context.body);
    
    context.set.status = 201;
    return {
      success: true,
      message: "Cart criado com sucesso",
      data: cart
    };
  } catch (err: any) {
    console.error(err);
    
    // Retorne erros específicos
    if (err.message.includes("não existe") || err.message.includes("insuficiente")) {
      context.set.status = 400;
      return {
        success: false,
        message: err.message
      };
    }
    
    context.set.status = 500;
    return {
      success: false,
      message: "Erro ao criar cart"
    };
  }
};

export const updateCartController = async (context: any) => {
  try {
    const cart = await updateCart(
      Number(context.params.id),
      context.body,
      context.body.user_id
    );
    
    return {
      success: true,
      message: "Cart atualizado",
      data: cart
    };
  } catch (err: any) {
    console.error(err);
    
    if (err.message.includes("não existe") || err.message.includes("Sem permissão")) {
      context.set.status = 400;
      return {
        success: false,
        message: err.message
      };
    }
    
    context.set.status = 500;
    return {
      success: false,
      message: "Erro ao atualizar cart"
    };
  }
};

export const deletCartController = async (context: any) => {
  try {
    const cart = await deletCart(Number(context.params.id));
    
    return {
      success: true,
      message: "Cart deletado",
      data: cart
    };
  } catch (err) {
    console.error(err);
    context.set.status = 500;
    return {
      success: false,
      message: "Erro ao deletar cart"
    };
  }
};

export const getCartByIdController = async (context: any) => {
  try {
    const cart = await getCartById(Number(context.params.id));
    
    return {
      success: true,
      data: cart
    };
  } catch (err) {
    console.error(err);
    context.set.status = 500;
    return {
      success: false,
      message: "Erro ao buscar cart"
    };
  }
};
export const getAllCartController = async ({ set }: any) => {
  try {
    const carts = await getAllCart();
    return {
      success: true,
      data: carts
    };
  } catch (err) {
    console.error(err);
    set.status = 500;
    return {
      success: false,
      message: "Erro ao buscar todos os carts"
    };
  }
};