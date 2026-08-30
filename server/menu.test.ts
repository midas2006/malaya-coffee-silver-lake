import { describe, expect, it, vi } from "vitest";
import type { TrpcContext } from "./_core/context";

const menuRow = {
  id: 1,
  name: "Malaya Signature Latte",
  description: "Malaya signature coffee with a cream top",
  price: "$8.00",
  category: "lattes" as const,
  imageUrl: null,
  isActive: 1,
  sortOrder: 1,
  createdAt: new Date(),
  updatedAt: new Date(),
};

const dbMocks = vi.hoisted(() => ({
  listMenuItems: vi.fn(async (includeInactive = false) => includeInactive ? [menuRow] : [menuRow]),
  createMenuItem: vi.fn(async (item: typeof menuRow) => ({ ...menuRow, ...item, id: 2 })),
  updateMenuItem: vi.fn(async (id: number, changes: Partial<typeof menuRow>) => ({ ...menuRow, ...changes, id })),
  removeMenuItem: vi.fn(async () => ({ success: true as const })),
}));

vi.mock("./db", () => dbMocks);

const { appRouter } = await import("./routers");

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function context(user: TrpcContext["user"]): TrpcContext {
  return {
    user,
    req: {} as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

const admin: AuthenticatedUser = {
  id: 1,
  openId: "owner",
  email: "owner@example.com",
  name: "Owner",
  loginMethod: "manus",
  role: "admin",
  createdAt: new Date(),
  updatedAt: new Date(),
  lastSignedIn: new Date(),
};

const member: AuthenticatedUser = { ...admin, role: "user" };

describe("menu procedures", () => {
  it("returns the public menu without requiring authentication", async () => {
    const caller = appRouter.createCaller(context(null));
    await expect(caller.menu.list()).resolves.toEqual([menuRow]);
    expect(dbMocks.listMenuItems).toHaveBeenCalledWith(false);
  });

  it("allows an admin to create and update menu items", async () => {
    const caller = appRouter.createCaller(context(admin));
    const created = await caller.menu.create({
      name: "Pandan Matcha",
      description: "Pandan matcha latte",
      price: "$8.00",
      category: "matchas",
      imageUrl: "",
      isActive: 1,
      sortOrder: 5,
    });
    expect(created?.name).toBe("Pandan Matcha");
    expect(dbMocks.createMenuItem).toHaveBeenCalled();

    const updated = await caller.menu.update({ id: 1, price: "$8.50" });
    expect(updated?.price).toBe("$8.50");
    expect(dbMocks.updateMenuItem).toHaveBeenCalledWith(1, { price: "$8.50" });
  });

  it("blocks regular users from admin menu mutations", async () => {
    const caller = appRouter.createCaller(context(member));
    await expect(caller.menu.create({
      name: "Unauthorized Item",
      description: "Should not be created",
      price: "$1.00",
      category: "espresso",
    })).rejects.toMatchObject({ code: "FORBIDDEN" });
    expect(dbMocks.createMenuItem).not.toHaveBeenCalledWith(expect.objectContaining({ name: "Unauthorized Item" }));
  });
});
