import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const syncUser = mutation({
    args: {
        name: v.string(),
        email: v.string(),
        clerkId: v.string(),
        image: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const existingUser = await ctx.db
        .query("users")
        .filter((q) => q.eq(q.field("clerkId"), args.clerkId))
        .first();

        if(existingUser) return 

        return await ctx.db.insert("users", args)
    },
});


export const updateUser = mutation({
    args: {
        email: v.string(),
        name: v.string(),
        image: v.optional(v.string()),
        clerkId: v.string(),
    },
    handler: async (ctx, args) => {

        const existingUser = await ctx.db.query("users").filter((q) => q.eq(q.field("clerkId"), args.clerkId)).first();

        if(!existingUser) return;

        await ctx.db.patch(existingUser._id, {
            email: args.email,
            name: args.name,
            image: args.image,
        });
        
    },
});