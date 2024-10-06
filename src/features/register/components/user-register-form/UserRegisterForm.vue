<template>
  <div class="user-register-form">
    <v-card :loading="store.state.loadingRegister">
      <v-card-item>
        <v-container>
          <v-row>
            <v-col md="6" class="col-dados-pessoais">
              <p class="text-h7 mb-2 p-title">DADOS PESSOAIS</p>
              <v-text-field
                density="comfortable"
                color="primary"
                label="Nome"
                maxlength="55"
                v-model="store.state.toAdd.nome"
                :error="hasError('Nome')"
                :error-messages="getErrorMessages('Nome')"
              />
              <div class="container-cpf-cnpj">
                <div class="radio">
                  <v-radio-group v-model="tipoPessoa" inline color="primary">
                    <v-radio :value="EnumTipoPessoa.Fisica" label="Física" />
                    <v-radio :value="EnumTipoPessoa.Juridica" label="Jurídica" />
                  </v-radio-group>
                </div>
                <div class="text-field">
                  <v-text-field
                    density="comfortable"
                    color="primary"
                    :label="isPessoaFisica ? 'CPF' : 'CNPJ'"
                    v-maska="isPessoaFisica ? '###.###.###-##' : '##.###.###/####-##'"
                    v-model="store.state.toAdd.cpfCnpj"
                    :error="hasError('CpfCnpj')"
                    :error-messages="getErrorMessages('CpfCnpj')"
                  />
                </div>
              </div>
              <v-text-field
                density="comfortable"
                color="primary"
                label="E-mail"
                type="email"
                maxlength="55"
                v-model="store.state.toAdd.email"
                :error="hasError('Email')"
                :error-messages="getErrorMessages('Email')"
              />
              <v-text-field
                density="comfortable"
                color="primary"
                label="Senha"
                type="password"
                maxlength="15"
                v-model="store.state.toAdd.senha"
                :error="hasError('Senha')"
                :error-messages="getErrorMessages('Senha')"
              />
              <v-text-field
                density="comfortable"
                color="primary"
                label="Celular"
                v-maska="'(##) #####-####'"
                v-model="store.state.toAdd.celular"
                :error="hasError('Celular')"
                :error-messages="getErrorMessages('Celular')"
              />
              <v-text-field
                density="comfortable"
                color="primary"
                label="Data de nascimento"
                type="date"
                v-model="store.state.toAdd.dataNascimento"
                :error="hasError('DataNascimento')"
                :error-messages="getErrorMessages('DataNascimento')"
              />
            </v-col>
            <v-col md="6">
              <p class="text-h7 mb-2 p-title">ENDEREÇO</p>
              <v-text-field
                density="comfortable"
                color="primary"
                label="CEP"
                v-maska="'#####-###'"
                v-model="store.state.toAdd.endereco.cep"
                :error="hasError('Cep')"
                :error-messages="getErrorMessages('Cep')"
                @blur="handleCep(($event.target as HTMLInputElement).value)"
              />
              <v-text-field
                density="comfortable"
                color="primary"
                label="Rua"
                maxlength="100"
                v-model="store.state.toAdd.endereco.rua"
                :error="hasError('Rua')"
                :error-messages="getErrorMessages('Rua')"
              />
              <v-text-field
                density="comfortable"
                color="primary"
                label="Bairro"
                maxlength="50"
                v-model="store.state.toAdd.endereco.bairro"
                :error="hasError('Bairro')"
                :error-messages="getErrorMessages('Bairro')"
              />
              <v-text-field
                density="comfortable"
                color="primary"
                label="Número"
                type="number"
                v-model="store.state.toAdd.endereco.numero"
                :error="hasError('Numero')"
                :error-messages="getErrorMessages('Numero')"
              />
              <UfDropdown
                ref="ufDropdown"
                @change="ufChanged"
                :value="store.state.toAdd.endereco.cidade.ufId"
                :error="hasError('UfId')"
                :error-messages="getErrorMessages('UfId')"
              />
              <CidadeDropdown
                :disabled="!store.state.toAdd.endereco.cidade.ufId || !ufSigla"
                :value="store.state.toAdd.endereco.cidade.nome"
                :uf="ufSigla"
                @change="store.setCidadeNome($event ?? '')"
                :error="hasError('Cidade.Nome')"
                :error-messages="getErrorMessages('Cidade.Nome')"
              />
            </v-col>
          </v-row>
        </v-container>
        <v-card-actions>
          <RouterLink to="/user/login">
            <v-btn color="primary" :loading="store.state.loadingRegister">
              <v-icon class="ml-0 pr-4" icon="mdi-chevron-left" end />
              VOLTAR
            </v-btn>
          </RouterLink>
          <v-spacer />
          <v-btn color="primary" @click="register" :loading="store.state.loadingRegister">
            CONCLUIR CADASTRO
            <v-icon icon="mdi-chevron-right" end />
          </v-btn>
        </v-card-actions>
      </v-card-item>
    </v-card>
  </div>
</template>
<style lang="less" src="./user-register-form.less"></style>

<script setup lang="ts">
import { vMaska } from 'maska/vue'
import { EnumTipoPessoa } from '@/enums/pessoa/EnumTipoPessoa'
import { useErrorFiedService } from '@/services/error-field/error-field-service'
import { useUserRegisterStore } from '../../store/user-register-store'
import { computed, onUnmounted, ref, watch } from 'vue'
import type { UfDropdownExpose } from '@/components/uf-dropdown/types/UfDropdownExpose'
import UfDropdown from '@/components/uf-dropdown/UfDropdown.vue'
import CidadeDropdown from '@/components/cidade-dropdown/CidadeDropdown.vue'
import { useNotificationStore } from '@/stores/notification/notification-store'
import { useRouter } from 'vue-router'

const router = useRouter()
const store = useUserRegisterStore()
const notificationStore = useNotificationStore()

const ufDropdown = ref<UfDropdownExpose>()

const ufSigla = ref<string | null>(null)

const { getErrorMessages, hasError } = useErrorFiedService(() => store.state.errors)

const ufChanged = (id: string | null | undefined) => {
  ufSigla.value = !ufDropdown.value
    ? null
    : (ufDropdown.value.getUfs().find((x) => x.id === id)?.sigla ?? null)
  store.setUfId(id ?? null)
  store.setCidadeNome('')
}

const handleCep = (cep: string) => {
  const ufs = ufDropdown.value?.getUfs() ?? []
  store.handleCep(cep, ufs, ({ uf }) => (ufSigla.value = uf))
}

const tipoPessoa = ref(EnumTipoPessoa.Fisica)
const isPessoaFisica = computed(() => tipoPessoa.value === EnumTipoPessoa.Fisica)

watch(tipoPessoa, () => store.setCpfCnpj(''))

const register = () => {
  store.register(
    () => {
      notificationStore.showNotificationSuccess('Cadastro concluído com sucesso!')
      setTimeout(() => router.push('/user/login'), 2000)
    },
    () => notificationStore.showNotificationError('Por favor, revise os campos!')
  )
}

onUnmounted(() => store.destroy())
</script>
