<script lang="ts">
  import * as Form from "$lib/components/ui/form";
  import { Input } from "$lib/components/ui/input";
  import { studentform,type SelectStudent } from "$lib/schemas";
  import {
    type SuperValidated,
    type Infer,
    superForm,
  } from "sveltekit-superforms";
  import { zodClient } from "sveltekit-superforms/adapters";
 
  export let data: SuperValidated<Infer<SelectStudent>>;
 
  const form = superForm(data, {
    validators: zodClient(studentform),
  });
 
  const { form: formData, enhance } = form;
</script>
 
<form method="POST" use:enhance>
  <Form.Field {form} name="rollNumber">
    <Form.Control let:attrs>
      <!-- <Form.Label>Username</Form.Label> -->
      <Input {...attrs} bind:value={$formData.rollNumber} />
    </Form.Control>
    <!-- <Form.Description>This is your public display name.</Form.Description> -->
    <Form.FieldErrors />
  </Form.Field>
	<Form.Field {form} name="text">
    <Form.Control let:attrs>
      <!-- <Form.Label>Username</Form.Label> -->
      <Input {...attrs} bind:value={$formData.name} />
    </Form.Control>
    <!-- <Form.Description>This is your public display name.</Form.Description> -->
    <Form.FieldErrors />
  </Form.Field>
	<Form.Field {form} name="number">
    <Form.Control let:attrs>
      <!-- <Form.Label>Username</Form.Label> -->
      <Input {...attrs} bind:value={$formData.} />
    </Form.Control>
    <!-- <Form.Description>This is your public display name.</Form.Description> -->
    <Form.FieldErrors />
  </Form.Field>
	<Form.Field {form} name="email">
    <Form.Control let:attrs>
      <!-- <Form.Label>Username</Form.Label> -->
      <Input {...attrs} bind:value={$formData.} />
    </Form.Control>
    <!-- <Form.Description>This is your public display name.</Form.Description> -->
    <Form.FieldErrors />
  </Form.Field>
	<Form.Field {form} name="subjects">
    <Form.Control let:attrs>
      <!-- <Form.Label>Username</Form.Label> -->
      <Input {...attrs} bind:value={$formData.} />
    </Form.Control>
    <!-- <Form.Description>This is your public display name.</Form.Description> -->
    <Form.FieldErrors />
  </Form.Field>
  <Form.Button>Submit</Form.Button>
</form>