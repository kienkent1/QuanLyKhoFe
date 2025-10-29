<template>
    <div class="w-full ">
        <div class="grid grid-cols-1 content-center bg-white shadow-[0_0_15px_3px_rgba(0,0,0,0.15)] rounded-xl p-6">
            <form @submit.prevent>

                <div class="mb-2">         
                    <label for="currentPass" class="block mb-2 text-sm font-medium text-gray-700">Mật khẩu hiện tại</label>
                    <input
                
                    type="text" name="currentPass"
                    placeholder="Nhập mật khẩu hiện tại"
                    class="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                </div>

                <div class="mb-2">         
                    <label for="newPass" class="block mb-2 text-sm font-medium text-gray-700">Mật khẩu mới</label>
                    <input
  
                    type="text" name="newPass"
                    placeholder="Nhập mật khẩu mới"
                    class="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                </div>

                <div class="mb-2">         
                    <label for="confirmPass" class="block mb-2 text-sm font-medium text-gray-700">Xác nhận mật khẩu</label>
                    <input
                   
                    type="text" name="confirmPass"
                    placeholder="Nhập mật khẩu mới để xác nhận"
                    class="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                </div>
            </form>
        </div>
    </div>
</template>