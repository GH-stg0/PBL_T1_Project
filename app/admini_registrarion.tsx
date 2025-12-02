async function addLostItem() {
  const { data, error } = await supabase
    .from('lost_items')
    .insert([
      { 
        name: 'Node.jsから登録した傘', 
        found_location: '理科室',
        description: '取っ手が木製の黒い傘です',
        status: 'stored'
        // registrant_id: '本来はここにユーザーUUIDが必要' 
        // ※RLSで「匿名登録」を許可していない場合、ログインユーザーIDがないとエラーになります
      },
    ])
    .select(); // 登録したデータをそのまま受け取る

  if (error) {
    console.error('登録エラー:', error.message);
  } else {
    console.log('登録成功:', data);
  }
}

// main() の代わりに addLostItem() を呼び出してテストできます
// addLostItem();